import { OERC20 } from "../abis/OErc20.ts";
import { EventHandlerFor } from "../deps.ts";
import { updateAccountOTokenCollateral } from "../utils/account.ts";

export const onRedeem: EventHandlerFor<typeof OERC20, "Redeem"> = async (
  ctx,
) => {
  const { redeemTokens, redeemer } = ctx.event.args;

  await updateAccountOTokenCollateral({
    account: redeemer,
    amount: -redeemTokens,
    oTokenAddress: ctx.event.address,
    store: ctx.store,
    client: ctx.client,
  });
};
