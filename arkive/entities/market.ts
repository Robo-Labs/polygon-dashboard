import { createEntity } from "../deps.ts";

export type Market = {
  address: string;
  symbol: string;
  name: string;
  borrowIndex: number;
  exchangeRate: number;
  priceUsd: number;
};

export const Market = createEntity<Market>("Market", {
  address: { type: "string", index: true },
  symbol: { type: "string", index: true },
  name: "string",
  borrowIndex: "number",
  exchangeRate: "number",
  priceUsd: "number",
});
