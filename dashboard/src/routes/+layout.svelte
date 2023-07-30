<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { LayoutData } from './$types';
	import '../app.css';
	import LatestBlockHeight from '$lib/components/stats/LatestBlockHeight.svelte';
	import Header from '$lib/components/header/Header.svelte';

	export let data: LayoutData;
</script>

<QueryClientProvider client={data.queryClient}>
	<div class="w-full">
		<Header />
		<div class="container mx-auto flex flex-col items-center justify-center p-4 gap-4 prose-lg">
			<h1 class="text-center m-0 font-light font-header">DeFi Lender Dashboard</h1>
			<p class="w-full text-center m-0 font-light font-header">Polygon zkEVM</p>
			<LatestBlockHeight />
			<slot />
		</div>
	</div>
</QueryClientProvider>
