<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import type { Chart as ChartJS, ChartData, Point } from 'chart.js';
	import { fontFamily } from 'tailwindcss/defaultTheme';
	export let data: ChartData<'line', (number | Point)[], unknown>;
	export let title: string;
	export let yAxesLabel: string = 'USD';
</script>

<div class="w-full px-10 py-8 outline outline-1 outline-secondary rounded">
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
							family: fontFamily.sans.join(', ')
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
						family: fontFamily.sans.join(', '),
						weight: 'normal'
					}
				}
			}
		}}
	/>
</div>
