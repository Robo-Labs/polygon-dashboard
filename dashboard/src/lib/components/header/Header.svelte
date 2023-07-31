<script>
	import Icon from '@iconify/svelte';
</script>

<header>
	<nav class="navbar bg-base-100">
		<div class="flex-1">
			<a
				href="https://robolabs.biz"
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-lg btn-ghost flex items-center gap-4"
			>
				<img src="robolabs_small.png" alt="Robo Labs Logo" />
				<p class="text-primary font-thin tracking-widest text-2xl font-header">ROBO LABS</p>
			</a>
		</div>
		<div class="flex-none join">
			<a href="https://twitter.com/robolabs_biz" target="_blank" rel="noopener noreferrer">
				<Icon icon="mdi:twitter" class="text-5xl hover:bg-base-300 rounded p-1" />
			</a>
			<a
				href="https://github.com/Robo-Labs/polygon-dashboard"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon icon="mdi:github" class="text-5xl hover:bg-base-300 rounded p-1" />
			</a>
		</div>
	</nav>
</header>
