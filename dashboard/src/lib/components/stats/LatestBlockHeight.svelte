<script lang="ts">
	import { STATS_QUERY_KEY, fetchStats } from '$lib/queries/stats';
	import { accountFilter } from '$lib/stores/filters';
	import { createQuery } from '@tanstack/svelte-query';
	import { polygonZkEvm } from 'viem/chains';
	import Icon from '@iconify/svelte';

	export let hidden = false;

	const query = createQuery({
		queryKey: [STATS_QUERY_KEY, $accountFilter],
		queryFn: () => fetchStats(fetch, { account: $accountFilter })
	});
</script>

{#if $query.data === undefined || $query.isLoading}
	<div
		class="fixed bottom-4 right-4 text-info px-3 rounded bg-base-200 bg-opacity-50 z-10 flex items-center"
	>
		<button
			on:click={() => (hidden = !hidden)}
			class:rotate-180={hidden}
			class="transition-transform"><Icon icon="mdi:chevron-right" /></button
		>
		Last updated block: <span class="ml-2 loading loading-dots loading-md" />
	</div>
{:else}
	<div
		class="fixed bottom-4 right-4 text-info px-3 rounded bg-base-200 bg-opacity-50 z-10 flex items-center"
		class:gap-2={!hidden}
	>
		<button
			on:click={() => (hidden = !hidden)}
			class:rotate-180={hidden}
			class="transition-transform"><Icon icon="mdi:chevron-right" /></button
		>
		<a
			href={`${polygonZkEvm.blockExplorers.default.url}/block/${$query.data.processedBlockHeight}`}
			target="_blank"
			rel="noopener noreferrer"
			class="link flex items-center gap-2 whitespace-nowrap"
			class:invisible={hidden}
			class:w-0={hidden}
			>Last updated block: {$query.data.processedBlockHeight.toLocaleString('en-US')}<Icon
				icon="mdi:open-in-new"
			/></a
		>
	</div>
{/if}
