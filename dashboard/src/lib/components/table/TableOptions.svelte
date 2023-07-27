<script lang="ts">
	import TableSearch from './TableSearch.svelte';
	import TableSelect from './TableSelect.svelte';
	import { STATS_QUERY_KEY, fetchStats } from '$lib/queries/stats';
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery({
		queryKey: [STATS_QUERY_KEY],
		queryFn: fetchStats
	});

	let protocolOptions: string[] = [];
	let tokenOptions: string[] = [];

	$: if ($query.isSuccess) {
		protocolOptions = [...new Set($query.data.map((stat) => stat.protocol))];
		tokenOptions = [...new Set($query.data.map((stat) => stat.pool))];
	}
</script>

<div class="collapse collapse-arrow w-full outline outline-1 outline-secondary shadow-lg">
	<input type="checkbox" />
	<div class="collapse-title font-bold">Options</div>
	<div class="join join-vertical w-full collapse-content">
		<TableSearch />
		<TableSelect title="Protocol" options={protocolOptions} />
		<TableSelect title="Token" options={tokenOptions} />
	</div>
</div>
