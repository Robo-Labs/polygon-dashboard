<script lang="ts">
	export let title: string;
	export let value: string;
	export let desc: string | undefined = undefined;
	export let loading = true;
</script>

<div class="stat">
	<div class="stat-title">{title}</div>
	{#if loading}
		<div class="stat-value"><span class="loading loading-dots loading-md" /></div>
	{:else}
		<div class="stat-value font-thin">{value}</div>
	{/if}
	{#if desc}
		<div class="stat-desc">{desc}</div>
	{/if}
</div>
