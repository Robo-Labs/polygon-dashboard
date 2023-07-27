<script lang="ts">
	import TableSearch from './TableSearch.svelte';
	import TableSelect from './TableSelect.svelte';
	import { STATS_QUERY_KEY, fetchStats } from '$lib/queries/stats';
	import { createQuery } from '@tanstack/svelte-query';
	import Icon from '@iconify/svelte';

	const query = createQuery({
		queryKey: [STATS_QUERY_KEY],
		queryFn: fetchStats
	});

	let protocolOptions: string[] = [];
	let tokenOptions: string[] = [];

	$: if ($query.isSuccess) {
		protocolOptions = [...new Set($query.data.stats.map((stat) => stat.protocol))];
		tokenOptions = [...new Set($query.data.stats.map((stat) => stat.token))];
	}
</script>

<div
	class="collapse collapse-arrow w-full outline outline-1 outline-secondary shadow-lg overflow-visible"
>
	<input type="checkbox" />
	<div class="collapse-title font-bold flex items-center gap-3">
		<Icon icon="ion:filter" />Filters
	</div>
	<div class="join join-vertical lg:join-horizontal w-full collapse-content">
		<TableSearch />
		<TableSelect title="Protocol" options={protocolOptions} />
		<TableSelect title="Token" options={tokenOptions} />
	</div>
</div>
