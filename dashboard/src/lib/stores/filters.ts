import { writable } from "svelte/store";
import { createDebouncedDerivedStore } from "./debounced";

export const poolFilter = writable<string | undefined>();
export const debouncedPoolFilter = createDebouncedDerivedStore(
  poolFilter,
  500,
  undefined,
);

export const tokenFilter = writable<string | undefined>();
export const debouncedTokenFilter = createDebouncedDerivedStore(
  tokenFilter,
  500,
  undefined,
);

export const protocolFilter = writable<string | undefined>();
export const debouncedProtocolFilter = createDebouncedDerivedStore(
  protocolFilter,
  500,
  undefined,
);

export const rawAccountFilter = writable<string | undefined>();
export const accountFilter = createDebouncedDerivedStore(
  rawAccountFilter,
  500,
  undefined,
);

tokenFilter.subscribe((token) => {
  console.log(token);
});
