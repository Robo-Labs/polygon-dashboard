<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { LayoutData } from './$types';
	import '../app.css';
	import LatestBlockHeight from '$lib/components/stats/LatestBlockHeight.svelte';

	export let data: LayoutData;
</script>

<QueryClientProvider client={data.queryClient}>
	<div class="w-full">
		<div class="container mx-auto flex flex-col items-center justify-center p-4 gap-4 prose-lg">
			<h1 class="w-full text-center pt-6 font-bold">Polygon ZkEvm</h1>
			<LatestBlockHeight />
			<slot />
		</div>
	</div>
</QueryClientProvider>
