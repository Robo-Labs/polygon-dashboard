import { parseAbi } from "../deps.ts";

export const PRICE_ORACLE = parseAbi([
  "event TokenIdSet(bytes32 tokenId, address oToken)",
]);
