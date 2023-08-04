<script>
	import { createQuery } from '@tanstack/svelte-query';
	import Stat from './Stat.svelte';
	import StatsGroup from './StatsGroup.svelte';
	import { STATS_QUERY_KEY, fetchStats } from '$lib/queries/stats';
	import { accountFilter } from '$lib/stores/filters';

	const query = createQuery({
		queryKey: [STATS_QUERY_KEY, $accountFilter],
		queryFn: () => fetchStats(fetch, { account: $accountFilter })
	});

	const numberFormatter = new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'USD',
		notation: 'compact'
	});

	$: totalSupply =
		$query.data?.stats.reduce((acc, stat) => acc + stat.dailyStats[0].supply, 0) ?? 0;
	$: totalBorrowed =
		$query.data?.stats.reduce((acc, stat) => acc + stat.dailyStats[0].debt, 0) ?? 0;
	$: totalBorrowingPower =
		$query.data?.stats.reduce((acc, stat) => acc + stat.dailyStats[0].borrowingPower, 0) ?? 0;
	$: collateralAtRisk =
		$query.data?.stats.reduce((acc, stat) => acc + stat.liquidationsAtRisk, 0) ?? 0;
</script>

<StatsGroup>
	<Stat
		title="Total Supplied"
		value={numberFormatter.format(totalSupply)}
		loading={$query.data === undefined || $query.isLoading}
	/>
	<Stat
		title="Total Borrowed / Total Borrowing Power"
		value={`${numberFormatter.format(totalBorrowed)} / ${numberFormatter.format(
			totalBorrowingPower
		)}`}
		loading={$query.data === undefined || $query.isLoading}
	/>
	<Stat
		title="Liquidations at Risk"
		value={numberFormatter.format(collateralAtRisk)}
		loading={$query.data === undefined || $query.isLoading}
		tooltip="The amount of collateral from borrowers with debt within 5% of their max borrow limit."
	/>
</StatsGroup>
