import { OERC20 } from "../abis/OErc20.ts";
import { EventHandlerFor } from "../deps.ts";
import { updateAccountOTokenCollateral } from "../utils/account.ts";

export const onTransfer: EventHandlerFor<typeof OERC20, "Transfer"> = async (
  ctx,
) => {
  const { amount, from, to } = ctx.event.args;

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
