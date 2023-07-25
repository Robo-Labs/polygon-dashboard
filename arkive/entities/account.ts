import { createEntity, Types } from "../deps.ts";
import { Market } from "./market.ts";

export type Account = {
  address: string;
  market: Market;
  oTokenCollateralBalance: number;
  borrowBalance: number;
  borrowIndex: number;
};

export const Account = createEntity<Account>("Account", {
  address: { type: "string", index: true },
  market: { type: Types.ObjectId, ref: Market.modelName },
  borrowBalance: "number",
  oTokenCollateralBalance: "number",
  borrowIndex: "number",
});
