<script lang="ts">
	import { goto } from '$app/navigation';
	let username = '';
	let password = '';
	let lastname = '';
	let firstname = '';
	let currentError = '';

	const register = async () => {
		try {
			const res = await fetch('http://localhost:3030/api/register', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'content-type': 'application/json'
				},
				body: JSON.stringify({ username, password, lastname, firstname })
			});
			const data = await res.json();
			console.log(data);
			if (data.error === true) throw new Error(data.message);
			await goto('./login', { noScroll: false, replaceState: true });
		} catch (e) {
			currentError = 'Error registering' + e;
		}
	};
</script>

<h1>Register</h1>

<form on:submit|preventDefault={register}>
	<div>
		<label>Firstname: <input type="text" bind:value={firstname} /></label>
		<label>Lastname: <input type="text" bind:value={lastname} /></label>
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
