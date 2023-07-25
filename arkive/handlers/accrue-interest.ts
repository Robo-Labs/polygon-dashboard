import { OERC20 } from "../abis/OErc20.ts";
import { EventHandlerFor } from "../deps.ts";
import { updateMarketBorrowindex } from "../utils/market.ts";

export const onAccrueInterest: EventHandlerFor<
  typeof OERC20,
  "AccrueInterest"
> = async (ctx) => {
  const { borrowIndex } = ctx.event.args;

  await updateMarketBorrowindex({
    address: ctx.event.address,
    store: ctx.store,
    client: ctx.client,
    borrowIndex,
  });
};
