import { createEntity, Types } from "../deps.ts";
import { Market } from "./market.ts";

export type Account = {
  address: string;
  market: Market;
};

export type AccountDaily = {
  account: Account;
  oTokenCollateralBalance: number;
  borrowBalance: number;
  borrowIndex: number;
  suppliedUsd: number;
  borrowedUsd: number;
  timestamp: number;
};

export type AccountLiquidationsAtRisk = {
  account: Account;
  liquidationsAtRisk: number;
  lastUpdated: number;
};

export const Account = createEntity<Account>("Account", {
  address: { type: "string", index: true },
  market: { type: Types.ObjectId, ref: Market.modelName, index: true },
});

export const AccountDaily = createEntity<AccountDaily>("AccountDaily", {
  account: { type: Types.ObjectId, ref: Account.modelName, index: true },
  oTokenCollateralBalance: "number",
  borrowBalance: "number",
  borrowIndex: "number",
  suppliedUsd: "number",
  borrowedUsd: "number",
  timestamp: { type: "number", index: true },
});

export const AccountLiquidationsAtRisk = createEntity<
  AccountLiquidationsAtRisk
>("AccountLiquidationsAtRisk", {
  account: { type: Types.ObjectId, ref: Account.modelName, index: true },
  liquidationsAtRisk: "number",
  lastUpdated: { type: "number", index: true },
});
