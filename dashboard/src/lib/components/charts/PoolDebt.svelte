<script lang="ts">
	import { STATS_QUERY_KEY, fetchStats } from '$lib/queries/stats';
	import { accountFilter } from '$lib/stores/filters';
	import { createQuery } from '@tanstack/svelte-query';
	import LineChart from './LineChart.svelte';
	import type { ChartData, Point } from 'chart.js';
	import { getLineColor } from '$lib/utils/chartData';

	const query = createQuery({
		queryKey: [STATS_QUERY_KEY, $accountFilter],
		queryFn: () => fetchStats(fetch, { account: $accountFilter })
	});

	let data: ChartData<'line', (number | Point)[]> = {
		labels: [],
		datasets: []
	};

	$: if ($query.data?.stats) {
		const sorted = $query.data.stats.sort(
			(a, b) => Number(b.dailyStats[0].debt) - Number(a.dailyStats[0].debt)
		);
		data = {
			labels: [
				...new Set(
					sorted
						.flatMap((stat) => stat.dailyStats)
						.map((stat) => new Date(stat.timestamp).toLocaleDateString().slice(0, -5))
				)
			],
			datasets: sorted.map((stat, index) => ({
				label: stat.pool,
				data: stat.dailyStats.map((stat) => stat.debt),
				backgroundColor: getLineColor(index),
				fill: false,
				borderColor: getLineColor(index)
			}))
		};
	}
</script>

<LineChart {data} title="Pools Debt" />
