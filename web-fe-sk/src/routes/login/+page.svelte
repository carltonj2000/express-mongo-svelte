<script lang="ts">
	import { goto } from '$app/navigation';
	let username = '';
	let password = '';
	let currentError = '';

	const login = async () => {
		try {
			const res = await fetch('http://localhost:3030/api/login', {
				method: 'POST',
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'content-type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});
			const data = await res.json();
			console.log(data);
			if (data.error === true) throw new Error(data.message);
			await goto('/', { noScroll: false, replaceState: true });
		} catch (e) {
			currentError = 'Error Loggin In:' + e;
		}
	};
</script>

<h1>Login</h1>

<form on:submit|preventDefault={login}>
	<div>
		<label>Username: <input type="text" bind:value={username} /></label>
		<label>Password: <input type="text" bind:value={password} /></label>
		<button type="submit">Submit</button>
	</div>
	<small>{currentError}</small>
</form>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	small {
		color: red;
	}
</style>
