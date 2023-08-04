// deno-lint-ignore-file no-explicit-any ban-types
import { GraphQLError, mongoose } from "../deps.ts";
import {
  Account as _Account,
  AccountDaily as _AccountDaily,
  AccountLiquidationsAtRisk as _AccountLiquidationsAtRisk,
} from "../entities/account.ts";
import { Market, MarketDaily } from "../entities/market.ts";

const connection = mongoose.connections[0].useDb("0-0");

const Account = connection.model("Account", _Account.schema);
const AccountDaily = connection.model("AccountDaily", _AccountDaily.schema);
const AccountLiquidationsAtRisk = connection.model(
  "AccountLiquidationsAtRisk",
  _AccountLiquidationsAtRisk.schema,
);

export const resolveLiquidationsAtRisk = async (
  _source: any,
  args: { filterByAccountAddress?: string },
) => {
  let accountFilter;

  if (args.filterByAccountAddress) {
    const accounts = await Account.find({
      address: args.filterByAccountAddress,
    });
    if (!accounts.length) {
      throw new GraphQLError(
        `Account not found for address ${args.filterByAccountAddress}`,
      );
    }
    accountFilter = accounts;
  } else {
    const markets = await Market.find();

    const accounts = await Account.find({
      market: { $in: markets.map((market) => market._id) },
      address: "total",
    });

    accountFilter = accounts;
  }

  const latestAccountLiquidationsAtRisk = await AccountLiquidationsAtRisk
    .find({ account: { $in: accountFilter.map((account) => account._id) } })
    .populate("account");

  if (
    latestAccountLiquidationsAtRisk.length &&
    !latestAccountLiquidationsAtRisk.some((account) => {
      return account.lastUpdated < Date.now() - 1000 * 60 * 60; // 1 hour
    })
  ) {
    return latestAccountLiquidationsAtRisk;
  }

  const res = await findAccountLiquidationsAtRisk(
    latestAccountLiquidationsAtRisk,
    accountFilter,
    !args.filterByAccountAddress,
  );
  return res;
};

const findAccountLiquidationsAtRisk = async (
  lars: (
    & mongoose.Document<unknown, {}, _AccountLiquidationsAtRisk>
    & _AccountLiquidationsAtRisk
    & {
      _id: mongoose.Types.ObjectId;
    }
  )[],
  accounts: (mongoose.Document<unknown, {}, _Account> & _Account & {
    _id: mongoose.Types.ObjectId;
  })[],
  aggregateAll: boolean,
) => {
  const latestMarkets: (
    & mongoose.Document<unknown, {}, MarketDaily>
    & MarketDaily
    & {
      _id: mongoose.Types.ObjectId;
    }
  )[] = await MarketDaily.aggregate([
    {
      $sort: {
        timestamp: -1,
        market: 1,
      },
    },
    {
      $group: {
        _id: {
          market: "$market",
        },
        doc: {
          $first: "$$ROOT",
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: "$doc",
      },
    },
    {
      $lookup: {
        from: "markets",
        localField: "market",
        foreignField: "_id",
        as: "market",
      },
    },
  ]);

  const latestAccounts: (
    & mongoose.Document<unknown, {}, _AccountDaily>
    & _AccountDaily
    & {
      _id: mongoose.Types.ObjectId;
    }
  )[] = await AccountDaily.aggregate([
    {
      $match: {
        account: {
          [aggregateAll ? "$nin" : "$in"]: accounts.map((account) =>
            account._id
          ),
        },
      },
    },
    {
      $sort: {
        account: 1,
        timestamp: -1,
      },
    },
    {
      $group: {
        _id: {
          account: "$account",
        },
        doc: {
          $first: "$$ROOT",
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: "$doc",
      },
    },
    {
      $lookup: {
        from: "accounts",
        localField: "account",
        foreignField: "_id",
        as: "account",
      },
    },
  ]);

  const liquidationsAtRisk: Record<string, number> = {};

  for (const latestAccount of latestAccounts) {
    const market = latestMarkets.find((market) => {
      return (market.market as any)[0]._id.equals(
        (latestAccount.account as any)[0].market,
      );
    });

    if (!market) {
      continue;
    }

    if (latestAccount.borrowIndex === 0) continue;

    const borrowedUsd = latestAccount.borrowBalance /
      latestAccount.borrowIndex * market.borrowIndex * market.priceUsd;
    const suppliedUsd = latestAccount.oTokenCollateralBalance *
      market.priceUsd * market.exchangeRate;
    const maxLtv = suppliedUsd * market.market.collateralFactor;

    let liquidationAtRisk = 0;

    if (borrowedUsd >= maxLtv * 0.95) {
      liquidationAtRisk = suppliedUsd;
    }

    if (
      liquidationsAtRisk[(market.market as any)[0]._id.toString()] === undefined
    ) {
      liquidationsAtRisk[(market.market as any)[0]._id.toString()] =
        liquidationAtRisk;
    } else {
      liquidationsAtRisk[(market.market as any)[0]._id.toString()] +=
        liquidationAtRisk;
    }
  }

  const ents = [];

  for (const [marketId, lar] of Object.entries(liquidationsAtRisk)) {
    let accountLar = lars.find((account) => {
      return (account.account.market as any)._id.toString() === marketId;
    });

    if (accountLar) {
      accountLar.liquidationsAtRisk = lar;
      accountLar.lastUpdated = Date.now();

      ents.push(accountLar);
      continue;
    }
    const account = accounts.find((account) => {
      return (account.market as any)._id.toString() === marketId;
    });
    if (!account) {
      continue;
    }

    accountLar = new AccountLiquidationsAtRisk({
      account: account._id,
      lastUpdated: Date.now(),
      liquidationsAtRisk: lar,
    });

    ents.push(accountLar);
  }

  AccountLiquidationsAtRisk.bulkSave(ents);

  return ents;
};
