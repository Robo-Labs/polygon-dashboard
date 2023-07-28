<script>
	import { createQuery } from '@tanstack/svelte-query';
	import Stat from './Stat.svelte';
	import StatsGroup from './StatsGroup.svelte';
	import { STATS_QUERY_KEY, fetchStats } from '$lib/queries/stats';
	import { accountFilter } from '$lib/stores/filters';

	const query = createQuery({
		queryKey: [`${STATS_QUERY_KEY}:${$accountFilter}`],
		queryFn: () => fetchStats({ account: $accountFilter })
	});

	const numberFormatter = new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'USD',
		notation: 'compact'
	});

	$: totalSupply = $query.data?.stats.reduce((acc, stat) => acc + stat.supply, 0) ?? 0;
	$: totalBorrowed = $query.data?.stats.reduce((acc, stat) => acc + stat.debt, 0) ?? 0;
	$: totalBorrowingPower =
		$query.data?.stats.reduce((acc, stat) => acc + stat.supply * stat.collateralFactor, 0) ?? 0;
</script>

<StatsGroup>
	<Stat
		title="Total Supplied"
		value={numberFormatter.format(totalSupply)}
		loading={$query.data === undefined || $query.isLoading}
	/>
	<Stat
		title="Borrowed / Borrowing Power"
		value={`${numberFormatter.format(totalBorrowed)} / ${numberFormatter.format(
			totalBorrowingPower
		)}`}
		loading={$query.data === undefined || $query.isLoading}
	/>
	<Stat
		title="Liquidations at Risk"
		value={numberFormatter.format($query.data?.collateralAtRisk ?? 0)}
		loading={$query.data === undefined || $query.isLoading}
	/>
</StatsGroup>
