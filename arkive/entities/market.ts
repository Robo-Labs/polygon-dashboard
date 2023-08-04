import { createEntity, Types } from "../deps.ts";

export type Market = {
  name: string;
  address: string;
  symbol: string;
  underlyingAddress: string;
  underlyingSymbol: string;
  collateralFactor: number;
  pythTokenId: string;
};

export type MarketDaily = {
  market: Market;
  borrowIndex: number;
  exchangeRate: number;
  priceUsd: number;
  timestamp: number;
};

export const Market = createEntity<Market>("Market", {
  address: { type: "string", index: true },
  name: "string",
  symbol: "string",
  underlyingAddress: "string",
  underlyingSymbol: "string",
  collateralFactor: "number",
  pythTokenId: "string",
});

export const MarketDaily = createEntity<MarketDaily>("MarketDaily", {
  market: { type: Types.ObjectId, ref: Market.modelName, index: true },
  borrowIndex: "number",
  exchangeRate: "number",
  priceUsd: "number",
  timestamp: { type: "number", index: true },
});
