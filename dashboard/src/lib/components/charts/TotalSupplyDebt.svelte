<script lang="ts">
	import { STATS_QUERY_KEY, fetchStats, type DailyStat } from '$lib/queries/stats';
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
		data = {
			labels: [
				...new Set(
					$query.data.stats
						.flatMap((stat) => stat.dailyStats)
						.map((stat) => new Date(stat.timestamp).toLocaleDateString().slice(0, -5))
				)
			],
			datasets: [
				{
					label: 'Supply',
					data: Object.entries(
						$query.data.stats.reduce((acc, stat) => {
							stat.dailyStats.forEach((dailyStat) => {
								if (acc[dailyStat.timestamp]) {
									acc[dailyStat.timestamp] += dailyStat.supply;
								} else {
									acc[dailyStat.timestamp] = dailyStat.supply;
								}
							});
							return acc;
						}, {} as Record<number, number>)
					)
						.sort(([a], [b]) => Number(a) - Number(b))
						.map(([_, supply]) => supply),
					backgroundColor: getLineColor(0),
					fill: false,
					borderColor: getLineColor(0)
				},
				{
					label: 'Debt',
					data: Object.entries(
						$query.data.stats.reduce((acc, stat) => {
							stat.dailyStats.forEach((dailyStat) => {
								if (acc[dailyStat.timestamp]) {
									acc[dailyStat.timestamp] += dailyStat.debt;
								} else {
									acc[dailyStat.timestamp] = dailyStat.debt;
								}
							});
							return acc;
						}, {} as Record<number, number>)
					)
						.sort(([a], [b]) => Number(a) - Number(b))
						.map(([_, debt]) => debt),
					backgroundColor: getLineColor(1),
					borderColor: getLineColor(1),
					fill: false
				}
			]
		};
	}
</script>

<LineChart {data} title="Total Supply & Debt" stacked={false} />
