import { fetchStats } from "$lib/queries/stats";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, fetch }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: () => fetchStats({ fetch }),
  });
};
