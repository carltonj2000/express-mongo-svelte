<script lang="ts">
	import { onMount } from 'svelte';
	import user from '../user';

	$: isLoggedIn = $user === null ? false : true;

	onMount(async () => {
		const userLoggedInStatus = async () => {
			const result = await fetch('http://localhost:3030/api/user', {
				method: 'GET',
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'content-type': 'application/json'
				}
			});
			return result;
		};
		const result = await userLoggedInStatus();
		const returnedData = await result.json();
		if (returnedData.success === true) user.update(() => returnedData.data);
	});
</script>

<div class="content">
	<h1>Welcome To Express, Mongo &amp; Svelte</h1>
	{#if isLoggedIn}
		<h2>Thank you {$user?.firstname} {$user?.lastname} for logging in.</h2>
	{:else}
		<h2>Would you like to log in?</h2>
		<h2>Head To Sign in page or register if you don't have an account</h2>
	{/if}
</div>
