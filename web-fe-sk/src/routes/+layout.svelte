<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
</script>

<div class="main-content">
	<Navbar />
	<slot />
</div>

<style>
	.main-content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
