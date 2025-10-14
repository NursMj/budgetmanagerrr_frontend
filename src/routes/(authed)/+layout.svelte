<script>
	import { initializeAuth } from '$lib/utils/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { auth } from "$lib/states/auth.svelte";

	// Single state object with runes
	let state = $state({
		isInitialized: false,
		isAuthenticated: false
	});

	let { children } = $props();

	const unprotectedRoutes = ['/signin', '/signup'];

	// Reactive values

	let shouldRedirect = $derived(
		state.isInitialized && !state.isAuthenticated && !unprotectedRoutes.includes(page.url.pathname)
	);

	// Effect for auth initialization
	$effect(() => {
		let cancelled = false;

		async function init() {
			const isAuthenticated = await initializeAuth();
			if (!cancelled && !state.isAuthenticated) {
				state.isAuthenticated = isAuthenticated;
				state.isInitialized = true;
			}
		}

		if (auth.isAuth) {
			state.isAuthenticated = true;
			state.isInitialized = true;
		} else {
			init();
		}

		return () => {
			cancelled = true;
		};
	});

	// Effect for redirects
	$effect(() => {
		if (shouldRedirect) {
			goto('/signin');
		}
	});
</script>

{#if !state.isInitialized}
	<div class="loading">Loading...</div>
{:else}
	{@render children()}
{/if}

<style>
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		font-size: 1.2rem;
		color: #666;
	}
</style>
