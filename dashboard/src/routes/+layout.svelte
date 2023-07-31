<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { LayoutData } from './$types';
	import '../app.css';
	import LatestBlockHeight from '$lib/components/stats/LatestBlockHeight.svelte';
	import Header from '$lib/components/header/Header.svelte';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>DeFi Lender Dashboard | Robo Labs</title>
	<meta name="description" content="Analytics for DeFi lending protocols by the Robo Labs team" />
	<meta name="keywords" content="DeFi Lender Dashboard | Robo Labs" />
	<meta name="author" content="Robo Labs" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="utf-8" />
	<meta name="theme-color" content="#000000" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@robolabs_biz" />
	<meta name="twitter:creator" content="@robolabs_biz" />
	<meta name="twitter:title" content="DeFi Lender Dashboard | Robo Labs" />
	<meta
		name="twitter:description"
		content="Analytics for DeFi lending protocols by the Robo Labs team"
	/>
	<meta name="twitter:image" content="robolabs_og.png" />
	<meta property="og:title" content="DeFi Lender Dashboard | Robo Labs" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://robolabs.biz" />
	<meta property="og:image" content="robolabs_og.png" />
	<meta
		property="og:description"
		content="Analytics for DeFi lending protocols by the Robo Labs team"
	/>
	<meta property="og:site_name" content="DeFi Lender Dashboard | Robo Labs" />
	<meta property="og:locale" content="en_US" />
</svelte:head>

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
