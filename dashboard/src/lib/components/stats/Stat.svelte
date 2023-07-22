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
