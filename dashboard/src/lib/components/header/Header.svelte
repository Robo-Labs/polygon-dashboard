<script>
	function handleClick() {}
</script>

<header>
	<!-- Navigation bar -->
	<nav
		class="relative flex w-full items-center justify-between py-2 shadow-lg hover:text-neutral-700 focus:text-neutral-700 md:flex-wrap md:justify-start"
		data-te-navbar-ref
	>
		<div class="flex w-full flex-wrap items-center justify-between px-3">
			<img src="robolabs_small.png" alt="Robo Labs Logo" />
			<button on:click={() => window.open('https://robolabs.biz', '_blank', 'noreferrer')}>
				<p class="ml-4 text-2xl text-primary font-header font-thin tracking-widest">ROBO LABS</p>
			</button>
			<!-- Navigation links -->
			<div class="!visible hidden grow basis-[100%] items-center lg:!flex lg:basis-auto" />
		</div>
	</nav>
</header>
