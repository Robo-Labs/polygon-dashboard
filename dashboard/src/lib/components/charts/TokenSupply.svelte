<script lang="ts">
	import {
		STATS_QUERY_KEY,
		fetchStats,
		type DailyAccountStat,
		type DailyStat
	} from '$lib/queries/stats';
	import { accountFilter } from '$lib/stores/filters';
	import { createQuery } from '@tanstack/svelte-query';
	import LineChart from './LineChart.svelte';
	import type { ChartData, ChartDataset, Point } from 'chart.js';
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
		data.datasets = [];
		const statsGroupedByToken = $query.data.stats.reduce((acc, stat) => {
			if (!acc[stat.tokenAddress.toLowerCase()]) {
				acc[stat.tokenAddress.toLowerCase()] = stat;
			} else {
				acc[stat.tokenAddress.toLowerCase()].dailyStats = acc[
					stat.tokenAddress.toLowerCase()
				].dailyStats.concat(stat.dailyStats);
			}
			return acc;
		}, {} as Record<string, DailyAccountStat>);

		Object.values(statsGroupedByToken).forEach((stat, i) => {
			data.datasets.push({
				label: stat.token.toUpperCase(),
				data: Object.values(
					stat.dailyStats.reduce((acc, dailyStat) => {
						if (acc[dailyStat.timestamp]) {
							acc[dailyStat.timestamp].supply += dailyStat.supply;
						} else {
							acc[dailyStat.timestamp] = dailyStat;
						}
						return acc;
					}, {} as Record<number, DailyStat>)
				)
					.sort((a, b) => a.timestamp - b.timestamp)
					.map((stat) => stat.supply),
				backgroundColor: getLineColor(i),
				fill: true,
				borderColor: getLineColor(i)
			});
		});

		data.labels = [
			...new Set(
				$query.data.stats
					.flatMap((stat) => stat.dailyStats)
					.map((stat) => new Date(stat.timestamp).toLocaleDateString().slice(0, -5))
			)
		];
	}
</script>

<LineChart {data} title="Tokens Supply" />
