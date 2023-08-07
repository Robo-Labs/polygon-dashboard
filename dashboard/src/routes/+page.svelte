<script>
	import PoolDebt from '$lib/components/charts/PoolDebt.svelte';
	import PoolSupply from '$lib/components/charts/PoolSupply.svelte';
	import TokenDebt from '$lib/components/charts/TokenDebt.svelte';
	import TokenSupply from '$lib/components/charts/TokenSupply.svelte';
	import TotalSupplyDebt from '$lib/components/charts/TotalSupplyDebt.svelte';
	import HeaderStats from '$lib/components/stats/HeaderStats.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableOptions from '$lib/components/table/TableOptions.svelte';
</script>

<HeaderStats />

<TableOptions />

<Table />

<TotalSupplyDebt />

<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
	<PoolSupply />
	<PoolDebt />
	<TokenSupply />
	<TokenDebt />
</div>
