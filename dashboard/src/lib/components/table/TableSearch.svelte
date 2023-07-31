<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let filterStore: Writable<string>;
	export let options: string[] = [];
	export let placeholder: string = '';
	export let noDropdown = false;

	let filter = '';
	let filteredOptions: string[] = [];

	$: if (!noDropdown) {
		filteredOptions = filter
			? options.filter((option) => option.toLowerCase().includes(filter.toLowerCase()))
			: options;
	} else {
		$filterStore = filter;
	}

	const onClick = (e: MouseEvent) => {
		if (noDropdown) return;
		e.stopPropagation();
		if (e.target instanceof HTMLButtonElement && e.target.textContent) {
			filterStore.set(e.target.textContent);
			filter = e.target.textContent;
		}
	};
</script>

<div class="dropdown join-item outline outline-1 outline-secondary w-full">
	<input type="text" bind:value={filter} {placeholder} class="input join-item w-full" />
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	{#if !noDropdown}
		<ul
			tabindex="0"
			class="my-0 dropdown-content z-[1] menu p-2 shadow bg-base-100 w-52 outline outline-1 outline-secondary"
		>
			{#each filteredOptions as option}
				<li>
					<button on:click={onClick}>{option}</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
