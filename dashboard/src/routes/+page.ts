import { fetchStats, STATS_QUERY_KEY } from "$lib/queries/stats";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, fetch }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: [STATS_QUERY_KEY],
    queryFn: async () => await fetchStats(fetch, {}),
  });
};
