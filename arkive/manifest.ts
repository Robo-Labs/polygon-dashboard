import { COMPTROLLER } from "./abis/Comptroller.ts";
import { OERC20 } from "./abis/OErc20.ts";
import { Manifest } from "./deps.ts";
import { Account } from "./entities/account.ts";
import { Market } from "./entities/market.ts";
import { onAccrueInterest } from "./handlers/accrue-interest.ts";
import { onBorrow } from "./handlers/borrow.ts";
// import { updateMarkets } from "./handlers/market-update.ts";
import { onMint } from "./handlers/mint.ts";
import { onRedeem } from "./handlers/redeem.ts";
import { onRepayBorrow } from "./handlers/repay-borrow.ts";
import { onTransfer } from "./handlers/transfer.ts";

export default new Manifest("polygon-zkevm")
  .addEntities([
    Account,
    Market,
  ])
  .addChain("polygonZkEvm", (chain) =>
    chain
      .setOptions({
        rpcUrl: "https://zkevm-rpc.com/",
      })
      .addContract({
        name: "Comptroller",
        abi: COMPTROLLER,
        sources: {
          "0x6EA32f626e3A5c41547235ebBdf861526e11f482": 101n,
        },
      })
      .addContract({
        name: "OErc20",
        abi: OERC20,
        eventHandlers: {
          Mint: onMint,
          Redeem: onRedeem,
          Transfer: onTransfer,
          AccrueInterest: onAccrueInterest,
          Borrow: onBorrow,
          RepayBorrow: onRepayBorrow,
        },
        factorySources: {
          Comptroller: {
            MarketListed: "oToken",
          },
        },
      }) // .addBlockHandler({
    //   blockInterval: 100,
    //   startBlockHeight: "live",
    //   handler: updateMarkets,
    // }))
  )
  .build();
