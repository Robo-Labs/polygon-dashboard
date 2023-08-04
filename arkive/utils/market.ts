import { OERC20 } from "../abis/OErc20.ts";
import {
  bigIntDivToFloat,
  bigIntToFloat,
  getClosestTimestamp,
  getContract,
  GetContractReturnType,
  mongoose,
  PublicClient,
  Store,
} from "../deps.ts";
import { Market, MarketDaily } from "../entities/market.ts";
import { EXP_SCALE_DECIMALS, O_ETH } from "./constants.ts";
import { STORE_KEYS } from "./keys.ts";
import { getODecimals, getUnderlyingDecimals } from "./token.ts";

/* -------------------------------------------------------------------------- */
/*                                   GETTERS                                  */
/* -------------------------------------------------------------------------- */

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
        name,
        symbol,
        collateralFactor: 0,
        underlyingAddress,
        underlyingSymbol,
        pythTokenId: "",
      });
      return newMarket.save();
    },
  );

  return res;
};

export const getMarkets = async () => {
  return await Market.find();
};

export const getMarketDaily = async (
  params: {
    address: `0x${string}`;
    store: Store;
    client: PublicClient;
    timestamp: number;
  },
) => {
  const market = await getMarket(params);

  const closestHour = getClosestTimestamp(params.timestamp, 86400000);

  const marketDaily = await params.store.retrieve(
    `${STORE_KEYS.MARKET}:${market.address}:${closestHour}`,
    async () => {
      const existingMarketDaily = await MarketDaily.findOne({
        market: market._id,
        timestamp: closestHour,
      });

      if (existingMarketDaily) return existingMarketDaily;

      const previousMarketDaily = await MarketDaily.findOne({
        market: market._id,
        timestamp: { $lt: closestHour },
      }).sort({ timestamp: -1 });

      const newMarketDaily = new MarketDaily({
        market: market._id,
        borrowIndex: previousMarketDaily?.borrowIndex || 1,
        exchangeRate: previousMarketDaily?.exchangeRate || 0.02,
        priceUsd: previousMarketDaily?.priceUsd || 1,
        timestamp: closestHour,
      });

      return newMarketDaily;
    },
  );

  return marketDaily;
};

export const getMarketPythTokenIds = async (params: {
  store: Store;
}) => {
  const tokenIds = await params.store.retrieve(
    STORE_KEYS.PYTH_TOKEN_IDS,
    async () => {
      const markets = await getMarkets();

      return markets.reduce((acc, market) => {
        acc[market.pythTokenId] = market.address; // [pythTokenId]: [marketAddress
        return acc;
      }, {} as Record<string, string>);
    },
  );

  return tokenIds;
};

/* -------------------------------------------------------------------------- */
/*                                   SETTERS                                  */
/* -------------------------------------------------------------------------- */

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

export const saveMarketDaily = (params: {
  store: Store;
  address: `0x${string}`;
  // deno-lint-ignore ban-types
  marketDaily: mongoose.Document<unknown, {}, MarketDaily> & MarketDaily & {
    _id: mongoose.Types.ObjectId;
  };
}) => {
  const { store, address } = params;

  store.set(
    `${STORE_KEYS.MARKET}:${address.toLowerCase()}:${params.marketDaily.timestamp}`,
    params.marketDaily.save(),
  );
};

export const updateMarketDailyBorrowindex = async (
  params: {
    address: `0x${string}`;
    store: Store;
    client: PublicClient;
    borrowIndex: bigint;
    timestamp: number;
  },
) => {
  let { address, client, store, borrowIndex, timestamp } = params;

  address = address.toLowerCase() as `0x${string}`;

  const marketDaily = await getMarketDaily({
    address,
    client,
    store,
    timestamp,
  });

  const formattedBorrowIndex = bigIntToFloat(borrowIndex, EXP_SCALE_DECIMALS);

  marketDaily.borrowIndex = formattedBorrowIndex;

  saveMarketDaily({
    address,
    store,
    marketDaily,
  });
};

export const updateMarketExchangeRate = async (params: {
  address: `0x${string}`;
  store: Store;
  oTokens: bigint;
  underlyingTokens: bigint;
  client: PublicClient;
  contract: GetContractReturnType<typeof OERC20, PublicClient>;
  timestamp: number;
}) => {
  const {
    address,
    client,
    oTokens,
    store,
    underlyingTokens,
    contract,
    timestamp,
  } = params;

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

  const market = await getMarketDaily({ address, client, store, timestamp });

  const exchangeRate = bigIntDivToFloat({
    amountA: underlyingTokens,
    amountB: oTokens,
    decimalsA: underlyingDecimals,
    decimalsB: oDecimals,
    precision: 18,
  });

  market.exchangeRate = exchangeRate;

  saveMarketDaily({
    address,
    marketDaily: market,
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
