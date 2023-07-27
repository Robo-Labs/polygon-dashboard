import { OERC20 } from "../abis/OErc20.ts";
import { EventHandlerFor, zeroAddress } from "../deps.ts";
import { updateAccountOTokenCollateral } from "../utils/account.ts";

export const onTransfer: EventHandlerFor<typeof OERC20, "Transfer"> = async (
  ctx,
) => {
  const { amount, from, to } = ctx.event.args;

  if (transferShouldBeIgnored(ctx)) return;

  await Promise.all([
    updateAccountOTokenCollateral({
      account: from,
      amount: -amount,
      client: ctx.client,
      store: ctx.store,
      oTokenAddress: ctx.event.address,
    }),
    updateAccountOTokenCollateral({
      account: to,
      amount: amount,
      client: ctx.client,
      store: ctx.store,
      oTokenAddress: ctx.event.address,
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
