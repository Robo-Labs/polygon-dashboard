<script lang="ts">
	import { STATS_QUERY_KEY, fetchStats } from '$lib/queries/stats';
	import { accountFilter } from '$lib/stores/filters';
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery({
		queryKey: [`${STATS_QUERY_KEY}:${$accountFilter}`],
		queryFn: () => fetchStats({ account: $accountFilter })
	});
</script>

{#if $query.data === undefined || $query.isLoading}
	<div class="fixed bottom-4 right-4 text-info">
		Last updated block: <span class="loading loading-dots loading-md" />
	</div>
{:else}
	<div class="fixed bottom-4 right-4 text-info">
		Last updated block: {$query.data.processedBlockHeight.toLocaleString('en-US')}
	</div>
{/if}
