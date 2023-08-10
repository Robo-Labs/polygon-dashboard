<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import type { Chart as ChartJS, ChartData, Point } from 'chart.js';
	import * as numeral from 'numeral';
	import defaultTheme from 'tailwindcss/defaultTheme';
	export let data: ChartData<'line', (number | Point)[], unknown>;
	export let title: string;
	export let stacked: boolean = true;
	export let yAxesLabel: string = 'USD';
	$: loading = !data.datasets.length;
</script>

<div class="w-full lg:px-10 lg:py-8 p-2 outline outline-1 outline-secondary rounded h-[500px]">
	{#if !loading}
		<Line
			{data}
			style="height: 100%; width: 100%;"
			options={{
				responsive: true,
				interaction: {
					intersect: false,
					mode: 'index'
				},
				scales: {
					x: {
						grid: {
							display: false
						}
					},
					y: {
						min: 0,
						stacked,
						display: true,
						title: {
							display: true,
							text: yAxesLabel,
							font: {
								size: 16,
								family: 'Inter, sans-serif'
							}
						},
						grid: {
							display: false
						},
						ticks: {
							callback: function (value, index, values) {
								return numeral(value).format('$0a');
							}
						}
					}
				},
				elements: {
					point: {
						radius: 0
					},
					line: {
						tension: 0.2
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
							family: 'Inter, sans-serif',
							weight: 'normal'
						}
					},
					tooltip: {
						itemSort: (a, b) => a.parsed.y - b.parsed.y,
						callbacks: {
							label: function (context) {
								console.log(context);
								return `${context.dataset.label} ${numeral(context.parsed.y).format('$0.0a')}`;
							}
						}
					}
				}
			}}
		/>
	{:else}
		<div class="w-full h-full flex justify-center items-center">
			<progress class="w-full progress" />
		</div>
	{/if}
</div>
