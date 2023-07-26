import { OERC20 } from "../abis/OErc20.ts";
import {
  PRICE_ORACLE_ABI,
  PRICE_ORACLE_ADDRESS,
} from "../config/priceOracle.ts";
import { bigIntToFloat, BlockHandler, getContract, parseAbi } from "../deps.ts";
import { getMarkets, saveMarket } from "../utils/market.ts";
import { getUnderlyingDecimals } from "../utils/token.ts";

export const priceUpdater: BlockHandler = async (ctx) => {
  const priceOracle = getContract({
    abi: parseAbi(PRICE_ORACLE_ABI),
    address: PRICE_ORACLE_ADDRESS,
    publicClient: ctx.client,
  });

  const markets = await getMarkets();

  await Promise.all(markets.map(async (market) => {
    const [price, underlyingDecimals] = await Promise.all([
      priceOracle.read.getUnderlyingPrice([
        market.address as `0x${string}`,
      ], { blockNumber: ctx.block.number }),
      getUnderlyingDecimals({
        contract: getContract({
          abi: OERC20,
          address: market.address as `0x${string}`,
          publicClient: ctx.client,
        }),
        client: ctx.client,
        store: ctx.store,
      }),
    ]);
    market.priceUsd = bigIntToFloat(price, 36 - underlyingDecimals);
    saveMarket({
      address: market.address as `0x${string}`,
      market,
      store: ctx.store,
    });
  }));
};
