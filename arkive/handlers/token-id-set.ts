import { PRICE_ORACLE } from "../abis/PriceOracle.ts";
import { EventHandlerFor } from "../deps.ts";
import { STORE_KEYS } from "../utils/keys.ts";
import {
  getMarket,
  getMarketPythTokenIds,
  saveMarket,
} from "../utils/market.ts";

export const onTokenIdSet: EventHandlerFor<typeof PRICE_ORACLE, "TokenIdSet"> =
  async (ctx) => {
    let { oToken, tokenId } = ctx.event.args;
    tokenId = tokenId.toLowerCase() as `0x${string}`;

    const market = await getMarket({
      address: oToken,
      client: ctx.client,
      store: ctx.store,
    });

    market.pythTokenId = tokenId;

    saveMarket({
      address: oToken,
      market,
      store: ctx.store,
    });

    const existingTokenIds = await getMarketPythTokenIds({ store: ctx.store });

    existingTokenIds[tokenId] = oToken;

    ctx.store.set(
      STORE_KEYS.PYTH_TOKEN_IDS,
      existingTokenIds,
    );
  };
