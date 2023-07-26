import { OERC20 } from "../abis/OErc20.ts";
import { EventHandlerFor } from "../deps.ts";
import { updateAccountOTokenCollateral } from "../utils/account.ts";
import { updateMarketExchangeRate } from "../utils/market.ts";

export const onRedeem: EventHandlerFor<typeof OERC20, "Redeem"> = async (
  ctx,
) => {
  const { redeemTokens, redeemer, redeemAmount } = ctx.event.args;

  await Promise.all([
    updateAccountOTokenCollateral({
      account: redeemer,
      amount: -redeemTokens,
      oTokenAddress: ctx.event.address,
      store: ctx.store,
      client: ctx.client,
    }),
    updateAccountOTokenCollateral({
      account: "total",
      amount: -redeemTokens,
      oTokenAddress: ctx.event.address,
      store: ctx.store,
      client: ctx.client,
    }),
    updateMarketExchangeRate({
      address: ctx.event.address,
      store: ctx.store,
      client: ctx.client,
      contract: ctx.contract,
      oTokens: redeemTokens,
      underlyingTokens: redeemAmount,
    }),
  ]);
};
