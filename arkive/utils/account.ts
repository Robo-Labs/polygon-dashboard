import { OERC20 } from "../abis/OErc20.ts";
import {
  getClosestTimestamp,
  GetContractReturnType,
  mongoose,
  PublicClient,
  Store,
} from "../deps.ts";
import { Account, AccountDaily } from "../entities/account.ts";
import { saveEntityToStore } from "./entity.ts";
import { STORE_KEYS } from "./keys.ts";
import { getMarket, getMarketDaily } from "./market.ts";
import { formatErc20Token, getUnderlyingFloat } from "./token.ts";

/* -------------------------------------------------------------------------- */
/*                                   GETTERS                                  */
/* -------------------------------------------------------------------------- */

export const getAccount = async (params: {
  account: string;
  market: `0x${string}`;
  client: PublicClient;
  store: Store;
}) => {
  let { account, market: marketAddress, client, store } = params;
  account = account.toLowerCase();
  marketAddress = marketAddress.toLowerCase() as `0x${string}`;

  const res = await store.retrieve(
    `${STORE_KEYS.ACCOUNT}:${account}:${marketAddress}`,
    async () => {
      const market = await getMarket({ address: marketAddress, client, store });

      const existingAccount = await Account.findOne({
        address: account,
        market: market._id,
      });

      if (existingAccount) return existingAccount;

      return new Account({
        address: account,
        market,
      }).save();
    },
  );

  return res;
};

export const getAccountDaily = async (params: {
  account: string;
  market: `0x${string}`;
  client: PublicClient;
  store: Store;
  timestamp: number;
}) => {
  const account = await getAccount(params);

  const closestHour = getClosestTimestamp(params.timestamp, 86400000);

  const accountDaily = await params.store.retrieve(
    `${STORE_KEYS.ACCOUNT}:${account.address.toLowerCase()}:${params.market.toLowerCase()}:${closestHour}`,
    async () => {
      const existingAccountDaily = await AccountDaily.findOne({
        account: account._id,
        market: account.market,
        timestamp: closestHour,
      });

      if (existingAccountDaily) return existingAccountDaily;

      const previousAccountDaily = await AccountDaily.findOne({
        account: account._id,
        market: account.market,
        timestamp: { $lt: closestHour },
      }).sort({ timestamp: -1 });

      return new AccountDaily({
        account: account._id,
        market: account.market,
        timestamp: closestHour,
        borrowBalance: previousAccountDaily?.borrowBalance || 0,
        borrowIndex: previousAccountDaily?.borrowIndex || 0,
        oTokenCollateralBalance:
          previousAccountDaily?.oTokenCollateralBalance || 0,
        suppliedUsd: previousAccountDaily?.suppliedUsd || 0,
        borrowedUsd: previousAccountDaily?.borrowedUsd || 0,
      });
    },
  );

  return accountDaily;
};

/* -------------------------------------------------------------------------- */
/*                                   SETTERS                                  */
/* -------------------------------------------------------------------------- */

export const saveAccount = (params: {
  // deno-lint-ignore ban-types
  account: mongoose.Document<unknown, {}, Account> & Account & {
    _id: mongoose.Types.ObjectId;
  };
  store: Store;
  marketAddress: string;
}) => {
  const { account, store, marketAddress } = params;

  saveEntityToStore({
    store,
    entity: account,
    key:
      `${STORE_KEYS.ACCOUNT}:${account.address.toLowerCase()}:${marketAddress.toLowerCase()}`,
  });
};

export const saveAccountDaily = (params: {
  accountDaily:
    // deno-lint-ignore ban-types
    & mongoose.Document<unknown, {}, AccountDaily>
    & AccountDaily
    & {
      _id: mongoose.Types.ObjectId;
    };
  store: Store;
  marketAddress: string;
  accountAddress: string;
}) => {
  const { accountDaily, store, marketAddress, accountAddress } = params;

  saveEntityToStore({
    store,
    entity: accountDaily,
    key:
      `${STORE_KEYS.ACCOUNT}:${accountAddress.toLowerCase()}:${marketAddress.toLowerCase()}:${accountDaily.timestamp}`,
  });
};

export const updateAccountDailyOTokenCollateral = async (params: {
  account: string;
  amount: bigint;
  oTokenAddress: `0x${string}`;
  store: Store;
  client: PublicClient;
  timestamp: number;
}) => {
  const { account, amount, oTokenAddress, store, client, timestamp } = params;

  const accountEnt = await getAccountDaily({
    account,
    market: oTokenAddress,
    client,
    store,
    timestamp,
  });

  const formattedAmount = await formatErc20Token({
    address: oTokenAddress,
    amount,
    client,
    store,
  });

  const marketDaily = await getMarketDaily({
    address: oTokenAddress,
    client,
    store,
    timestamp,
  });

  const newOTokenCollateralBalance = accountEnt.oTokenCollateralBalance +
    formattedAmount;
  const newSuppliedUsd = newOTokenCollateralBalance * marketDaily.exchangeRate *
    marketDaily.priceUsd;

  accountEnt.oTokenCollateralBalance = newOTokenCollateralBalance;
  accountEnt.suppliedUsd = newSuppliedUsd;

  saveAccountDaily({
    accountDaily: accountEnt,
    store,
    marketAddress: oTokenAddress,
    accountAddress: account,
  });
};

export const updateAccountDailyBorrow = async (params: {
  account: string;
  accountBorrows: bigint;
  market: `0x${string}`;
  store: Store;
  client: PublicClient;
  contract: GetContractReturnType<typeof OERC20, PublicClient>;
  timestamp: number;
}) => {
  const {
    account,
    accountBorrows,
    client,
    market,
    store,
    contract,
    timestamp,
  } = params;

  const marketDaily = await getMarketDaily({
    address: market,
    client,
    store,
    timestamp,
  });

  const accountEnt = await getAccountDaily({
    account,
    market,
    client,
    store,
    timestamp,
  });

  const formattedAmount = await getUnderlyingFloat({
    amount: accountBorrows,
    client,
    store,
    contract,
  });

  accountEnt.borrowBalance = formattedAmount;
  accountEnt.borrowIndex = marketDaily.borrowIndex;
  accountEnt.borrowedUsd = formattedAmount * marketDaily.priceUsd;

  saveAccountDaily({
    accountDaily: accountEnt,
    store,
    marketAddress: market,
    accountAddress: account,
  });
};
