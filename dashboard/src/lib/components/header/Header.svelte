<script>
	import Icon from '@iconify/svelte';
</script>

<header>
	<nav class="navbar outline outline-1 outline-secondary">
		<div class="flex-1">
			<a
				href="https://robolabs.biz"
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-lg btn-ghost flex items-center gap-4 px-2"
			>
				<img src="robolabs_small.png" alt="Robo Labs Logo" height="60px" width="60px" />
				<p class="text-primary font-thin tracking-widest text-lg lg:text-2xl font-header uppercase">
					ROBO LABS
				</p>
			</a>
		</div>
		<div class="flex-none join">
			<a href="https://twitter.com/robolabs_biz" target="_blank" rel="noopener noreferrer">
				<Icon icon="mdi:twitter" class="lg:text-5xl text-4xl hover:bg-base-300 rounded p-1" />
			</a>
			<a
				href="https://github.com/Robo-Labs/polygon-dashboard"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon icon="mdi:github" class="lg:text-5xl text-4xl hover:bg-base-300 rounded p-1" />
			</a>
		</div>
	</nav>
</header>
