import { OERC20 } from "../abis/OErc20.ts";
import {
  EventHandlerFor,
  getTimestampFromBlockNumber,
  zeroAddress,
} from "../deps.ts";
import { updateAccountDailyOTokenCollateral } from "../utils/account.ts";
import { ONE_HOUR_MS, POLYGON_ZKEVM_BLOCKTIME_MS } from "../utils/constants.ts";

export const onTransfer: EventHandlerFor<typeof OERC20, "Transfer"> = async (
  ctx,
) => {
  const { amount, from, to } = ctx.event.args;

  if (transferShouldBeIgnored(ctx)) return;

  const timestamp = await getTimestampFromBlockNumber({
    blockNumber: ctx.event.blockNumber,
    client: ctx.client,
    store: ctx.store,
    group: {
      blockTimeMs: POLYGON_ZKEVM_BLOCKTIME_MS,
      groupTimeMs: ONE_HOUR_MS,
    },
  });

  await Promise.all([
    updateAccountDailyOTokenCollateral({
      account: from,
      amount: -amount,
      client: ctx.client,
      store: ctx.store,
      oTokenAddress: ctx.event.address,
      timestamp,
    }),
    updateAccountDailyOTokenCollateral({
      account: to,
      amount: amount,
      client: ctx.client,
      store: ctx.store,
      oTokenAddress: ctx.event.address,
      timestamp,
    }),
  ]);
};

const transferShouldBeIgnored = (ctx: Parameters<typeof onTransfer>[0]) => {
  let { from, to } = ctx.event.args;
  from = from.toLowerCase() as `0x${string}`;
  to = to.toLowerCase() as `0x${string}`;
  const _address = ctx.event.address.toLowerCase();

  // ignore mint and redeem
  if (from === zeroAddress || to === zeroAddress) return true;
  if (from === _address || to === _address) return true;

  return false;
};
