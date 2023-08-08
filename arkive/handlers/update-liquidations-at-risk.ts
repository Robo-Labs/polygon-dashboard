// deno-lint-ignore-file ban-types
import { BlockHandler, mongoose } from "../deps.ts";
import {
  Account,
  AccountDaily,
  AccountLiquidationsAtRisk,
} from "../entities/account.ts";
import { MarketDaily } from "../entities/market.ts";

export const updateLiquidationsAtRisk: BlockHandler = async (ctx) => {
  const timestamp = Number(ctx.block.timestamp);

  const latestAccountLiquidationsAtRisk = await AccountLiquidationsAtRisk
    .findOne({}).sort({ lastUpdated: -1 });

  if (
    latestAccountLiquidationsAtRisk &&
    latestAccountLiquidationsAtRisk.lastUpdated >
      Number(timestamp) - 10 * 60 * 1000 // 10 minutes
  ) {
    return;
  }

  const [latestMarkets, totalAccounts] = await Promise.all([
    MarketDaily.aggregate([
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
      {
        $unwind: "$market",
      },
    ]),
    await Account.find({ address: "total" }),
  ]);
  const latestAccounts: (
    & mongoose.Document<unknown, {}, AccountDaily>
    & AccountDaily
    & {
      _id: mongoose.Types.ObjectId;
    }
  )[] = await AccountDaily.aggregate([
    {
      $match: {
        account: {
          $nin: totalAccounts.map((account) => account._id),
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
    {
      $unwind: "$account",
    },
  ]);

  const liquidationsAtRisk: Record<string, number> = {};
  const markets = latestMarkets.reduce(
    (acc, market) => {
      acc[market.market._id.toString()] = market;
      return acc;
    },
    {} as Record<
      string,
      mongoose.Document<unknown, {}, MarketDaily> & MarketDaily & {
        _id: mongoose.Types.ObjectId;
      }
    >,
  );

  for (const latestAccount of latestAccounts) {
    const market = markets[latestAccount.account.market.toString()];

    if (!market) {
      console.log(
        "no market",
        latestAccount.account.market.toString(),
      );
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
      liquidationsAtRisk[market.market._id.toString()] === undefined
    ) {
      liquidationsAtRisk[market.market._id.toString()] = liquidationAtRisk;
    } else {
      liquidationsAtRisk[market.market._id.toString()] += liquidationAtRisk;
    }
  }

  const bulkOps = [];

  for (
    const [marketId, liquidationAtRisk] of Object.entries(liquidationsAtRisk)
  ) {
    const totalAccount = totalAccounts.find((account) =>
      account.market.toString() === marketId
    );
    if (!totalAccount) {
      ctx.logger.warning(`no total account for market id ${marketId}`);
      continue;
    }
    bulkOps.push({
      updateOne: {
        filter: {
          account: totalAccount,
        },
        update: {
          $set: {
            liquidationsAtRisk: liquidationAtRisk,
            lastUpdated: timestamp,
          },
        },
        upsert: true,
      },
    });
  }

  await AccountLiquidationsAtRisk.bulkWrite(bulkOps);

  ctx.logger.info("updated liquidations at risk");
};
