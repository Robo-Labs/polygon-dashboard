<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import type { Chart as ChartJS, ChartData, Point } from 'chart.js';
	import defaultTheme from 'tailwindcss/defaultTheme';
	export let data: ChartData<'line', (number | Point)[], unknown>;
	export let title: string;
	export let yAxesLabel: string = 'USD';
	$: loading = !data.datasets.length;
</script>

<div class="w-full px-10 py-8 outline outline-1 outline-secondary rounded">
	{#if !loading}
		<Line
			{data}
			options={{
				responsive: true,
				interaction: {
					intersect: false,
					mode: 'index'
				},
				scales: {
					y: {
						display: true,
						title: {
							display: true,
							text: yAxesLabel,
							font: {
								size: 16,
								family: defaultTheme.fontFamily.sans.join(', ')
							}
						}
					}
				},
				plugins: {
					legend: {
						position: 'bottom',
						align: 'start'
					},
					title: {
						text: title,
						display: true,
						font: {
							size: 20,
							family: defaultTheme.fontFamily.sans.join(', '),
							weight: 'normal'
						}
					}
				}
			}}
		/>
	{:else}
		<progress class="w-full progress" />
	{/if}
</div>
