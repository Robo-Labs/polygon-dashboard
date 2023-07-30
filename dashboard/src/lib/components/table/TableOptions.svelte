<script lang="ts">
	import TableSearch from './TableSearch.svelte';
	import { STATS_QUERY_KEY, fetchStats } from '$lib/queries/stats';
	import { createQuery } from '@tanstack/svelte-query';
	import Icon from '@iconify/svelte';
	import {
		accountFilter,
		poolFilter,
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
	let poolOptions: string[] = [];

	$: if ($query.isSuccess) {
		protocolOptions = [...new Set($query.data.stats.map((stat) => stat.protocol))];
		tokenOptions = [...new Set($query.data.stats.map((stat) => stat.token))];
		poolOptions = [...new Set($query.data.stats.map((stat) => stat.pool))];
	}
</script>

<div
	class="collapse collapse-arrow w-full outline outline-1 outline-secondary shadow-lg overflow-visible rounded"
>
	<input type="checkbox" />
	<div class="collapse-title font-bold flex items-center gap-3">
		<Icon icon="ion:filter" />Filters
	</div>
	<div class="join join-vertical lg:join-horizontal collapse-content">
		<TableSearch placeholder="Pool" filterStore={poolFilter} options={poolOptions} />
		<TableSearch placeholder="Protocol" filterStore={protocolFilter} options={protocolOptions} />
		<TableSearch placeholder="Token" filterStore={tokenFilter} options={tokenOptions} />
		<TableSearch placeholder="Account" filterStore={rawAccountFilter} noDropdown />
	</div>
</div>
