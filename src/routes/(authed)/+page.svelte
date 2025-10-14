<script lang="ts">
	import { logout } from '$lib/utils/auth';
	import { auth } from '$lib/states/auth.svelte';
</script>

<h1>Budgetmanager home page</h1>

<button
    onclick={logout}
	type="button"
	class="me-2 mb-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
	>Logout</button
>

{#if auth.isAuth}
	User {auth.user?.name}
{/if}
