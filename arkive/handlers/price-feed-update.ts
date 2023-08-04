import { PYTH } from "../abis/Pyth.ts";
import {
  bigIntToFloat,
  EventHandlerFor,
  getTimestampFromBlockNumber,
} from "../deps.ts";
import {
  ONE_HOUR_MS,
  POLYGON_ZKEVM_BLOCKTIME_MS,
  PYTH_PRICE_DECIMALS,
} from "../utils/constants.ts";
import {
  getMarketDaily,
  getMarketPythTokenIds,
  saveMarketDaily,
} from "../utils/market.ts";

export const onPriceFeedUpdate: EventHandlerFor<
  typeof PYTH,
  "PriceFeedUpdate"
> = async (ctx) => {
  let { price, id } = ctx.event.args;
  id = id.toLowerCase() as `0x${string}`;

  const marketIds = await getMarketPythTokenIds({ store: ctx.store });

  if (!marketIds[id]) return;

  const timestamp = await getTimestampFromBlockNumber({
    blockNumber: ctx.event.blockNumber,
    client: ctx.client,
    store: ctx.store,
    group: {
      blockTimeMs: POLYGON_ZKEVM_BLOCKTIME_MS,
      groupTimeMs: ONE_HOUR_MS,
    },
  });

  const marketDaily = await getMarketDaily({
    address: marketIds[id] as `0x${string}`,
    timestamp,
    store: ctx.store,
    client: ctx.client,
  });

  const priceUsd = bigIntToFloat(price, PYTH_PRICE_DECIMALS);

  marketDaily.priceUsd = priceUsd;

  saveMarketDaily({
    address: marketIds[id] as `0x${string}`,
    store: ctx.store,
    marketDaily,
  });
};
