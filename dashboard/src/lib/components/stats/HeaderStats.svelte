<script>
	import { createQuery } from '@tanstack/svelte-query';
	import Stat from './Stat.svelte';
	import StatsGroup from './StatsGroup.svelte';
	import { STATS_QUERY_KEY, fetchStats } from '$lib/queries/stats';

	const query = createQuery({
		queryKey: [STATS_QUERY_KEY],
		queryFn: fetchStats
	});

	const numberFormatter = new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'USD',
		notation: 'compact'
	});

	$: totalSupply = $query.data?.reduce((acc, stat) => acc + stat.supply, 0) ?? 0;
	$: totalBorrowed = $query.data?.reduce((acc, stat) => acc + stat.debt, 0) ?? 0;
	$: totalBorrowingPower =
		$query.data?.reduce((acc, stat) => acc + stat.supply * stat.collateralFactor, 0) ?? 0;
</script>

<StatsGroup>
	<Stat
		title="Total Supplied"
		value={numberFormatter.format(totalSupply)}
		loading={totalSupply === 0 || $query.isLoading}
	/>
	<Stat
		title="Borrowed / Borrowing Power"
		value={`${numberFormatter.format(totalBorrowed)} / ${numberFormatter.format(
			totalBorrowingPower
		)}`}
		loading={totalBorrowed === 0 || totalBorrowingPower === 0 || $query.isLoading}
	/>
	<Stat title="Liquidations at Risk" value="$42k" loading={$query.isLoading} />
</StatsGroup>
