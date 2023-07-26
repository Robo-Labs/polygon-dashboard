import { COMPTROLLER } from "../abis/Comptroller.ts";
import { EventHandlerFor } from "../deps.ts";
import { updateMarketCollateralFactor } from "../utils/market.ts";

export const onNewCollateralFactor: EventHandlerFor<
  typeof COMPTROLLER,
  "NewCollateralFactor"
> = async (ctx) => {
  const { newCollateralFactorMantissa, oToken } = ctx.event.args;

  await updateMarketCollateralFactor({
    address: oToken,
    store: ctx.store,
    client: ctx.client,
    collateralFactor: newCollateralFactorMantissa,
  });
};
