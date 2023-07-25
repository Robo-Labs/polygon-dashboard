import { OERC20 } from "../abis/OErc20.ts";
import { EventHandlerFor } from "../deps.ts";
import { updateAccountBorrow } from "../utils/account.ts";

export const onRepayBorrow: EventHandlerFor<typeof OERC20, "RepayBorrow"> =
  async (ctx) => {
    const { accountBorrows, borrower } = ctx.event.args;

    await updateAccountBorrow({
      account: borrower,
      accountBorrows,
      market: ctx.event.address,
      client: ctx.client,
      store: ctx.store,
    });
  };
