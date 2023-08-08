<script lang="ts">
	export let href: string;
	export let text: string;
</script>

<a {href} target="_blank" rel="noopener noreferrer" class="link hover:bg-base-200">
	{text}
</a>
