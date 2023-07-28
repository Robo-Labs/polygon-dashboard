import { fetchStats, STATS_QUERY_KEY } from "$lib/queries/stats";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: [`${STATS_QUERY_KEY}:total`],
    queryFn: () => fetchStats({ account: "total" }),
  });
};
