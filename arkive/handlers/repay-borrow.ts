import { OERC20 } from "../abis/OErc20.ts";
import { EventHandlerFor, getTimestampFromBlockNumber } from "../deps.ts";
import { updateAccountDailyBorrow } from "../utils/account.ts";
import { ONE_HOUR_MS, POLYGON_ZKEVM_BLOCKTIME_MS } from "../utils/constants.ts";

export const onRepayBorrow: EventHandlerFor<typeof OERC20, "RepayBorrow"> =
  async (ctx) => {
    const { accountBorrows, borrower, totalBorrows } = ctx.event.args;

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
      updateAccountDailyBorrow({
        account: borrower,
        accountBorrows,
        market: ctx.event.address,
        client: ctx.client,
        store: ctx.store,
        contract: ctx.contract,
        timestamp,
      }),
      updateAccountDailyBorrow({
        account: "total",
        accountBorrows: totalBorrows,
        market: ctx.event.address,
        client: ctx.client,
        store: ctx.store,
        contract: ctx.contract,
        timestamp,
      }),
    ]);
  };
