<script lang="ts">
	export let title: string;
	export let options: string[] = [];
</script>

<select class="select w-full outline outline-1 outline-secondary join-item">
	<option disabled selected>{title}</option>
	{#each options as option}
		<option>{option}</option>
	{/each}
</select>
