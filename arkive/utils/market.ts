import { OERC20 } from "../abis/OErc20.ts";
import {
  bigIntDivToFloat,
  bigIntToFloat,
  getContract,
  GetContractReturnType,
  mongoose,
  PublicClient,
  Store,
} from "../deps.ts";
import { Market } from "../entities/market.ts";
import { EXP_SCALE_DECIMALS, O_ETH } from "./constants.ts";
import { STORE_KEYS } from "./keys.ts";
import { getODecimals, getUnderlyingDecimals } from "./token.ts";

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
      let underlyingAddress;
      let underlyingSymbol;

      if (address === O_ETH) {
        underlyingAddress = "native";
        underlyingSymbol = "ETH";
      } else {
        underlyingAddress = await store.retrieve(
          `${STORE_KEYS.UNDERLYING}:${address}`,
          contract.read.underlying,
        );
        const underlyingContract = getContract({
          abi: OERC20,
          address: underlyingAddress,
          publicClient: client,
        });
        underlyingSymbol = await store.retrieve(
          `${STORE_KEYS.SYMBOL}:${underlyingAddress.toLowerCase()}`,
          underlyingContract.read.symbol,
        );
      }

      const newMarket = new Market({
        address,
        borrowIndex: 1,
        exchangeRate: 1,
        name,
        symbol,
        priceUsd: 1,
        collateralFactor: 0,
        underlyingAddress,
        underlyingSymbol,
      });
      return newMarket.save();
    },
  );

  return res;
};

export const getMarkets = async () => {
  return await Market.find();
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

  saveMarket({
    address,
    store,
    market,
  });
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

export const updateMarketExchangeRate = async (params: {
  address: `0x${string}`;
  store: Store;
  oTokens: bigint;
  underlyingTokens: bigint;
  client: PublicClient;
  contract: GetContractReturnType<typeof OERC20, PublicClient>;
}) => {
  const { address, client, oTokens, store, underlyingTokens, contract } =
    params;

  if (oTokens === 0n) return;

  const [oDecimals, underlyingDecimals] = await Promise.all([
    getODecimals({
      contract,
      store,
    }),
    getUnderlyingDecimals({
      contract,
      store,
      client,
    }),
  ]);

  const market = await getMarket({ address, client, store });

  const exchangeRate = bigIntDivToFloat({
    amountA: underlyingTokens,
    amountB: oTokens,
    decimalsA: underlyingDecimals,
    decimalsB: oDecimals,
    precision: 18,
  });

  market.exchangeRate = exchangeRate;

  saveMarket({
    address,
    market,
    store,
  });
};

export const updateMarketCollateralFactor = async (
  params: {
    store: Store;
    address: `0x${string}`;
    collateralFactor: bigint;
    client: PublicClient;
  },
) => {
  let { address, collateralFactor, store, client } = params;

  address = address.toLowerCase() as `0x${string}`;

  const formattedCollateralFactor = bigIntToFloat(
    collateralFactor,
    EXP_SCALE_DECIMALS,
  );

  const market = await getMarket({
    address,
    client,
    store,
  });

  market.collateralFactor = formattedCollateralFactor;

  saveMarket({
    address,
    store,
    market,
  });
};

export const saveMarket = (params: {
  store: Store;
  address: `0x${string}`;
  // deno-lint-ignore ban-types
  market: mongoose.Document<unknown, {}, Market> & Market & {
    _id: mongoose.Types.ObjectId;
  };
}) => {
  const { store, address } = params;

  store.set(
    `${STORE_KEYS.MARKET}:${address.toLowerCase()}`,
    params.market.save(),
  );
};
