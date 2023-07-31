<script lang="ts">
	import TableSearch from './TableSearch.svelte';
	import { STATS_QUERY_KEY, fetchStats } from '$lib/queries/stats';
	import { createQuery } from '@tanstack/svelte-query';
	import {
		accountFilter,
		// poolFilter,
		protocolFilter,
		rawAccountFilter,
		tokenFilter
	} from '$lib/stores/filters';

	const query = createQuery({
		queryKey: [`${STATS_QUERY_KEY}:${$accountFilter}`],
		queryFn: () => fetchStats({ account: $accountFilter })
	});

	let protocolOptions: string[] = [];
	let tokenOptions: string[] = [];
	// let poolOptions: string[] = [];

	$: if ($query.isSuccess) {
		protocolOptions = [...new Set($query.data.stats.map((stat) => stat.protocol))];
		tokenOptions = [...new Set($query.data.stats.map((stat) => stat.token))];
		// poolOptions = [...new Set($query.data.stats.map((stat) => stat.pool))];
	}
</script>

<div class="join join-vertical lg:join-horizontal w-full rounded">
	<TableSearch placeholder="Protocol" filterStore={protocolFilter} options={protocolOptions} />
	<TableSearch placeholder="Token" filterStore={tokenFilter} options={tokenOptions} />
	<TableSearch placeholder="Account" filterStore={rawAccountFilter} noDropdown />
</div>
