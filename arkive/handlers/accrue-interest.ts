import { OERC20 } from "../abis/OErc20.ts";
import { EventHandlerFor, getTimestampFromBlockNumber } from "../deps.ts";
import { ONE_HOUR_MS, POLYGON_ZKEVM_BLOCKTIME_MS } from "../utils/constants.ts";
import { updateMarketDailyBorrowindex } from "../utils/market.ts";

export const onAccrueInterest: EventHandlerFor<
  typeof OERC20,
  "AccrueInterest"
> = async (ctx) => {
  const { borrowIndex } = ctx.event.args;

  const timestamp = await getTimestampFromBlockNumber({
    blockNumber: ctx.event.blockNumber,
    client: ctx.client,
    store: ctx.store,
    group: {
      blockTimeMs: POLYGON_ZKEVM_BLOCKTIME_MS,
      groupTimeMs: ONE_HOUR_MS,
    },
  });

  await updateMarketDailyBorrowindex({
    address: ctx.event.address,
    store: ctx.store,
    client: ctx.client,
    borrowIndex,
    timestamp,
  });
};
