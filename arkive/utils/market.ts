import { OERC20 } from "../abis/OErc20.ts";
import { bigIntToFloat, getContract, PublicClient, Store } from "../deps.ts";
import { Market } from "../entities/market.ts";
import { EXP_SCALE_DECIMALS } from "./constants.ts";
import { STORE_KEYS } from "./keys.ts";

export const getMarket = async (
  params: { address: `0x${string}`; store: Store; client: PublicClient },
) => {
  let { address, store, client } = params;

  address = address.toLowerCase() as `0x${string}`;

  const res = await store.retrieve(
    `${STORE_KEYS.MARKET}:${address}`,
    async () => {
      const existingMarket = await Market.findOne({ address });
      if (existingMarket) return existingMarket;
      const contract = getContract({
        abi: OERC20,
        address: address,
        publicClient: client,
      });
      const name = await store.retrieve(
        `${STORE_KEYS.NAME}:${address}`,
        contract.read.name,
      );
      const symbol = await store.retrieve(
        `${STORE_KEYS.SYMBOL}:${address}`,
        contract.read.symbol,
      );
      const newMarket = new Market({
        address,
        borrowIndex: 1,
        exchangeRate: 1,
        name,
        priceUsd: 1,
        symbol,
      });
      return newMarket.save();
    },
  );

  return res;
};

export const updateMarketBorrowindex = async (
  params: {
    address: `0x${string}`;
    store: Store;
    client: PublicClient;
    borrowIndex: bigint;
  },
) => {
  let { address, client, store, borrowIndex } = params;

  address = address.toLowerCase() as `0x${string}`;

  const market = await getMarket({
    address,
    client,
    store,
  });

  const formattedBorrowIndex = bigIntToFloat(borrowIndex, EXP_SCALE_DECIMALS);

  market.borrowIndex = formattedBorrowIndex;

  store.set(`${STORE_KEYS.MARKET}:${address}`, market.save());
  store.set(`${STORE_KEYS.BORROW_INDEX}:${address}`, formattedBorrowIndex);
};

export const getMarketBorrowIndex = async (
  params: { address: `0x${string}`; store: Store; client: PublicClient },
) => {
  let { address, store, client } = params;

  address = address.toLowerCase() as `0x${string}`;

  return await store.retrieve(
    `${STORE_KEYS.BORROW_INDEX}:${address}`,
    async () => {
      const market = await getMarket({ address, client, store });
      return market.borrowIndex;
    },
  );
};
