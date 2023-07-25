import { mongoose, PublicClient, Store, zeroAddress } from "../deps.ts";
import { Account } from "../entities/account.ts";
import { STORE_KEYS } from "./keys.ts";
import { getMarket, getMarketBorrowIndex } from "./market.ts";
import { formatErc20Token } from "./token.ts";

export const updateAccountOTokenCollateral = async (params: {
  account: string;
  amount: bigint;
  oTokenAddress: `0x${string}`;
  store: Store;
  client: PublicClient;
}) => {
  const { account, amount, oTokenAddress, store, client } = params;

  if (account === zeroAddress) return;
  if (account === oTokenAddress) return;

  const accountEnt = await getAccount({
    account,
    market: oTokenAddress,
    client,
    store,
  });

  const formattedAmount = await formatErc20Token({
    address: oTokenAddress,
    amount,
    client,
    store,
  });

  accountEnt.oTokenCollateralBalance += formattedAmount;

  saveAccount({ account: accountEnt, store });
};

export const updateAccountBorrow = async (params: {
  account: string;
  accountBorrows: bigint;
  market: `0x${string}`;
  store: Store;
  client: PublicClient;
}) => {
  const { account, accountBorrows, client, market, store } = params;

  const marketBorrowIndex = await getMarketBorrowIndex({
    address: market,
    client,
    store,
  });

  const accountEnt = await getAccount({
    account,
    market,
    client,
    store,
  });

  const formattedAmount = await formatErc20Token({
    address: market,
    amount: accountBorrows,
    client,
    store,
  });

  accountEnt.borrowBalance = formattedAmount;
  accountEnt.borrowIndex = marketBorrowIndex;

  saveAccount({ account: accountEnt, store });
};

export const saveAccount = (params: {
  // deno-lint-ignore ban-types
  account: mongoose.Document<unknown, {}, Account> & Account & {
    _id: mongoose.Types.ObjectId;
  };
  store: Store;
}) => {
  const { account, store } = params;

  store.set(
    `${STORE_KEYS.ACCOUNT}:${account.address.toLowerCase()}:${account.market.address.toLowerCase()}`,
    account.save(),
  );
};

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
        borrowBalance: 0,
        borrowIndex: 1,
        market,
        oTokenCollateralBalance: 0,
      });
    },
  );

  return res;
};
