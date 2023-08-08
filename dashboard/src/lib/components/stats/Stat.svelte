<script lang="ts">
	import Tooltip from '../info/Tooltip.svelte';

	export let title: string;
	export let value: string;
	export let desc: string | undefined = undefined;
	export let loading = true;
	export let tooltip: string | undefined = undefined;
</script>

<div class="stat z-10">
	<div class="stat-title flex items-center gap-1">
		{title}
		{#if tooltip}
			<Tooltip text={tooltip} />
		{/if}
	</div>
	{#if loading}
		<div class="stat-value">
			<span class="loading loading-dots loading-md" />
		</div>
	{:else}
		<div class="stat-value font-thin">
			{value}
		</div>
	{/if}
	{#if desc}
		<div class="stat-desc">{desc}</div>
	{/if}
</div>
