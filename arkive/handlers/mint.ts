import { OERC20 } from "../abis/OErc20.ts";
import { EventHandlerFor, getTimestampFromBlockNumber } from "../deps.ts";
import { updateAccountDailyOTokenCollateral } from "../utils/account.ts";
import { ONE_HOUR_MS, POLYGON_ZKEVM_BLOCKTIME_MS } from "../utils/constants.ts";
import { updateMarketExchangeRate } from "../utils/market.ts";

export const onMint: EventHandlerFor<typeof OERC20, "Mint"> = async (ctx) => {
  const { mintTokens, minter, mintAmount } = ctx.event.args;

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
    updateAccountDailyOTokenCollateral({
      account: minter,
      amount: mintTokens,
      oTokenAddress: ctx.event.address,
      store: ctx.store,
      client: ctx.client,
      timestamp,
    }),
    updateAccountDailyOTokenCollateral({
      account: "total",
      amount: mintTokens,
      oTokenAddress: ctx.event.address,
      store: ctx.store,
      client: ctx.client,
      timestamp,
    }),
    updateMarketExchangeRate({
      address: ctx.event.address,
      store: ctx.store,
      client: ctx.client,
      contract: ctx.contract,
      oTokens: mintTokens,
      underlyingTokens: mintAmount,
      timestamp,
    }),
  ]);
};
