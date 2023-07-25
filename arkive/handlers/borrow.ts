import { OERC20 } from "../abis/OErc20.ts";
import { EventHandlerFor } from "../deps.ts";
import { updateAccountBorrow } from "../utils/account.ts";

export const onBorrow: EventHandlerFor<typeof OERC20, "Borrow"> = async (
  ctx,
) => {
  const { borrower, accountBorrows } = ctx.event.args;

  await updateAccountBorrow({
    account: borrower,
    accountBorrows,
    market: ctx.event.address,
    client: ctx.client,
    store: ctx.store,
  });
};
