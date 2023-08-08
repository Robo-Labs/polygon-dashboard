import { derived, type Writable } from "svelte/store";

export const createDebouncedDerivedStore = <TWritable>(
  store: Writable<TWritable>,
  debounceMs: number,
  initialValue?: TWritable,
) => {
  return derived<typeof store, TWritable>(store, (value, set) => {
    if (!value || value === initialValue) {
      set(value);
    }

    const timeout = setTimeout(() => {
      set(value);
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, initialValue);
};
