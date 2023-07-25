import { OERC20 } from "../abis/OErc20.ts";
import { EventHandlerFor } from "../deps.ts";
import { updateAccountOTokenCollateral } from "../utils/account.ts";

export const onMint: EventHandlerFor<typeof OERC20, "Mint"> = async (ctx) => {
  const { mintTokens, minter } = ctx.event.args;

  await updateAccountOTokenCollateral({
    account: minter,
    amount: mintTokens,
    oTokenAddress: ctx.event.address,
    store: ctx.store,
    client: ctx.client,
  });
};
