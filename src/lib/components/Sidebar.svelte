<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { auth } from '$lib/states/auth.svelte';
	import { logout } from '$lib/utils/auth';
	import { setSidebar } from '$lib/states/interface.svelte';

	const closeSideBar = () => {
		setSidebar(false);
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div transition:fade onclick={closeSideBar} class="fixed z-10 inset-0 bg-gray-400 opacity-50"></div>
<div transition:fly={{x: -400}} class="fixed z-10 top-0 bottom-0 flex w-60 flex-col gap-8 bg-white p-3 pt-10">
	<div class="user-ingo flex flex-col">
		<span class="text-lg">
			{auth.user?.name}
		</span>
		<span class="text-m">
			{auth.user?.email}
		</span>
	</div>

	<nav class="flex flex-col gap-3">
		<ul class="flex flex-col gap-3">
			<li><a href="/statistics">Statistic</a></li>
			<li><a href="/history">History</a></li>
			<li><a href="/support">Support</a></li>
		</ul>
	</nav>

	<button
		onclick={logout}
		type="button"
		class="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
		>Logout</button
	>
</div>
