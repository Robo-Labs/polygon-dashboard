import { createEntity } from "../deps.ts";

export type Market = {
  address: string;
  symbol: string;
  underlyingAddress: string;
  underlyingSymbol: string;
  name: string;
  borrowIndex: number;
  exchangeRate: number;
  priceUsd: number;
  collateralFactor: number;
};

export const Market = createEntity<Market>("Market", {
  address: { type: "string", index: true },
  symbol: { type: "string", index: true },
  underlyingAddress: "string",
  underlyingSymbol: "string",
  name: "string",
  borrowIndex: "number",
  exchangeRate: "number",
  priceUsd: "number",
  collateralFactor: "number",
});
