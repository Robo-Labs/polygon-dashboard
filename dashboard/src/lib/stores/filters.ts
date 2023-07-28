import { validateAddress } from "$lib/utils/validation";
import { derived, writable } from "svelte/store";

export const poolFilter = writable("all");
export const tokenFilter = writable("all");
export const protocolFilter = writable("all");
export const rawAccountFilter = writable("total");
export const accountFilter = derived(rawAccountFilter, (account, set) => {
  if (!account || account === "total") {
    set("total");
  }

  if (validateAddress(account)) {
    set(account);
  }
}, "total");
