<script>
	import Stat from '$lib/components/stats/Stat.svelte';
	import StatsGroup from '$lib/components/stats/StatsGroup.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableOptions from '$lib/components/table/TableOptions.svelte';
</script>

<StatsGroup>
	<Stat title="Total Supply" value="$1.4M" />
	<Stat title="Borrowed / Borrowing Power" value="$500k / $800k" />
	<Stat title="Liquidations at Risk" value="$42k" />
</StatsGroup>

<TableOptions />

<Table />
