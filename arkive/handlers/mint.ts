import { OERC20 } from "../abis/OErc20.ts";
import { EventHandlerFor } from "../deps.ts";
import { updateAccountOTokenCollateral } from "../utils/account.ts";
import { updateMarketExchangeRate } from "../utils/market.ts";

export const onMint: EventHandlerFor<typeof OERC20, "Mint"> = async (ctx) => {
  const { mintTokens, minter, mintAmount } = ctx.event.args;

  await Promise.all([
    updateAccountOTokenCollateral({
      account: minter,
      amount: mintTokens,
      oTokenAddress: ctx.event.address,
      store: ctx.store,
      client: ctx.client,
    }),
    updateAccountOTokenCollateral({
      account: "total",
      amount: mintTokens,
      oTokenAddress: ctx.event.address,
      store: ctx.store,
      client: ctx.client,
    }),
    updateMarketExchangeRate({
      address: ctx.event.address,
      store: ctx.store,
      client: ctx.client,
      contract: ctx.contract,
      oTokens: mintTokens,
      underlyingTokens: mintAmount,
    }),
  ]);
};
