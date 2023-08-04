// deno-lint-ignore-file no-explicit-any
import { composeMongoose } from "npm:graphql-compose-mongoose";
import { COMPTROLLER } from "./abis/Comptroller.ts";
import { OERC20 } from "./abis/OErc20.ts";
import { PRICE_ORACLE } from "./abis/PriceOracle.ts";
import { PYTH } from "./abis/Pyth.ts";
import { COMPTROLLER_ADDRESS } from "./config/comptroller.ts";
import { Manifest } from "./deps.ts";
import {
  Account,
  AccountDaily,
  AccountLiquidationsAtRisk,
} from "./entities/account.ts";
import { Market, MarketDaily } from "./entities/market.ts";
import { onAccrueInterest } from "./handlers/accrue-interest.ts";
import { onBorrow } from "./handlers/borrow.ts";
import { onMint } from "./handlers/mint.ts";
import { onNewCollateralFactor } from "./handlers/new-collateral-factor.ts";
import { onPriceFeedUpdate } from "./handlers/price-feed-update.ts";
import { onRedeem } from "./handlers/redeem.ts";
import { onRepayBorrow } from "./handlers/repay-borrow.ts";
import { onTokenIdSet } from "./handlers/token-id-set.ts";
import { onTransfer } from "./handlers/transfer.ts";
import { resolveLiquidationsAtRisk } from "./queries/liquidations.ts";

export default new Manifest("polygon-zkevm")
  .addEntities([
    Market,
    MarketDaily,
    Account,
    AccountDaily,
  ])
  .extendSchema((schemaComposer) => {
    const accLarTc = composeMongoose<any>(AccountLiquidationsAtRisk, {
      schemaComposer,
    });
    const accTc = schemaComposer.getOTC("Account");

    accLarTc.addRelation(
      "account",
      {
        type: accTc,
      },
    );

    schemaComposer.Query.addFields({
      LiquidationsAtRisk: {
        type: [accLarTc],
        args: {
          filterByAccountAddress: {
            type: "String",
          },
        },
        resolve: (_source: any, args: { filterByAccountAddress?: string }) => {
          return resolveLiquidationsAtRisk(_source, args);
        },
      },
    });
  })
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
      .addContract({
        name: "PriceOracle",
        abi: PRICE_ORACLE,
        eventHandlers: {
          TokenIdSet: onTokenIdSet,
        },
        sources: {
          "0xBC81104207C160cFE48585cC8D753aD2c7031FF7": 143n,
        },
      })
      .addContract({
        name: "Pyth",
        abi: PYTH,
        eventHandlers: {
          PriceFeedUpdate: onPriceFeedUpdate,
        },
        sources: {
          "0xC5E56d6b40F3e3B5fbfa266bCd35C37426537c65": 143n,
        },
      }))
  .build();
