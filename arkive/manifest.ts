import { COMPTROLLER } from "./abis/Comptroller.ts";
import { OERC20 } from "./abis/OErc20.ts";
import { COMPTROLLER_ADDRESS } from "./config/comptroller.ts";
import { Manifest } from "./deps.ts";
import { Account } from "./entities/account.ts";
import { Market } from "./entities/market.ts";
import { onAccrueInterest } from "./handlers/accrue-interest.ts";
import { onBorrow } from "./handlers/borrow.ts";
import { onMint } from "./handlers/mint.ts";
import { onNewCollateralFactor } from "./handlers/new-collateral-factor.ts";
import { onRedeem } from "./handlers/redeem.ts";
import { onRepayBorrow } from "./handlers/repay-borrow.ts";
import { onTransfer } from "./handlers/transfer.ts";
import { priceUpdater } from "./handlers/update-price.ts";

export default new Manifest("polygon-zkevm")
  .addEntities([
    Market,
    Account,
  ])
  .addChain("polygonZkEvm", (chain) =>
    chain
      .addContract({
        name: "Comptroller",
        abi: COMPTROLLER,
        sources: {
          [COMPTROLLER_ADDRESS]: 101n,
        },
        eventHandlers: {
          NewCollateralFactor: onNewCollateralFactor,
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
      })
      .addBlockHandler({
        blockInterval: 150, // 5 minutes (2s per block),
        startBlockHeight: 200n,
        handler: priceUpdater,
      }))
  .build();
