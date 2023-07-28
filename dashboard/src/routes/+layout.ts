import { browser } from "$app/environment";
import type { LayoutLoad } from "./$types";
import { QueryClient } from "@tanstack/svelte-query";

export const load: LayoutLoad = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        refetchInterval: 5000,
      },
    },
  });

  return { queryClient };
};
