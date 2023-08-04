<script lang="ts">
	import { STATS_QUERY_KEY, fetchStats, type DailyStat } from '$lib/queries/stats';
	import { accountFilter } from '$lib/stores/filters';
	import { LineChart, type LineChartOptions, ScaleTypes } from '@carbon/charts-svelte';
	import { ChartTheme } from '@carbon/charts';
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery({
		queryKey: [STATS_QUERY_KEY, $accountFilter],
		queryFn: () => fetchStats(fetch, { account: $accountFilter })
	});

	$: data =
		$query.data?.stats
			.flatMap((stat) => stat.dailyStats)
			.reduce((acc, dailyStat) => {
				if (!acc[dailyStat.timestamp]) {
					acc[dailyStat.timestamp] = [
						{
							date: new Date(dailyStat.timestamp),
							value: dailyStat.supply,
							group: 'Supply'
						},
						{
							date: new Date(dailyStat.timestamp),
							value: dailyStat.debt,
							group: 'Debt'
						}
					];
				} else {
					acc[dailyStat.timestamp][0].value += dailyStat.supply;
					acc[dailyStat.timestamp][1].value += dailyStat.debt;
				}
				return acc;
			}, {} as Record<number, { group: string; date: Date; value: number }[]>) ?? {};
	$: options = {
		title: 'Total Supply / Debt',
		axes: {
			bottom: {
				title: 'Date',
				mapsTo: 'date',
				scaleType: ScaleTypes.TIME
			},
			left: {
				title: 'Amount',
				mapsTo: 'value',
				scaleType: ScaleTypes.LINEAR
			}
		},
		curve: 'curveMonotoneX',
		height: '500px',
		theme: ChartTheme.G100
	} satisfies LineChartOptions;
</script>

<div class="w-full px-10 py-8 outline outline-1 outline-secondary rounded">
	<LineChart data={Object.values(data).flat()} {options} />
</div>
