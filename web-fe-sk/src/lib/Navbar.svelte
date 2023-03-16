<script lang="ts">
	import { goto } from '$app/navigation';
	import user from '../user';
	$: isLoggedIn = $user === null ? false : true;

	const logout = async () => {
		await fetch('http://localhost:3030/api/logout', {
			method: 'POST',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json'
			}
		});
		user.update(() => null);
		await goto('/', { noScroll: false, replaceState: true });
	};
</script>

<nav>
	<a href="/">Home</a>
	{#if isLoggedIn === false}
		<a href="/login">Login</a>
		<a href="/register">Register</a>
	{:else}
		<button on:click={logout}>logout</button>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}
</style>
