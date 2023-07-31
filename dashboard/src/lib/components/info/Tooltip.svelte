<script lang="ts">
	import Icon from '@iconify/svelte';
	export let text: string;
</script>

<div class="tooltip tooltip-bottom before:whitespace-normal" data-tip={text}>
	<Icon icon="mdi:information-slab-circle-outline" />
</div>
