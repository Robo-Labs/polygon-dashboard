<script lang="ts">
	export let title: string | undefined = undefined;
	export let value: string | undefined = undefined;
	export let desc: string | undefined = undefined;
</script>

<div class="stat">
	{#if title}
		<div class="stat-title">{title}</div>
	{/if}
	{#if value}
		<div class="stat-value">{value}</div>
	{/if}
	{#if desc}
		<div class="stat-desc">{desc}</div>
	{/if}
</div>

<style>
	.stat {
		border-color: hsl(var(--sc) / var(--tw-border-opacity));
		--tw-border-opacity: 0.1;
	}
	.stat-title {
		color: hsl(var(--sc) / 0.6);
	}
</style>
