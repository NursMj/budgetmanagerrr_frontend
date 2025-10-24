<script lang="ts">
	import { auth } from '$lib/states/auth.svelte';
	import { setSidebar } from '$lib/states/interface.svelte';
	import { logout } from '$lib/utils/auth';

	const openSidebar = () => {
		setSidebar(true);
	};
</script>

<div
	class="header flex items-center justify-between bg-indigo-400 px-4 py-2 text-white md:px-6 md:py-3"
>
	<div class="flex items-end gap-8">
		<div class="logo text-lg font-bold md:text-2xl"><a href="/">Budgetmanagerrr</a></div>
		<nav class="hidden md:block">
			<ul class="flex gap-3">
				<li><a class="w-full" href="/statistics">Statistics</a></li>
				<li><a class="w-full" href="/history">History</a></li>
				<li><a class="w-full" href="/support">Support</a></li>
			</ul>
		</nav>
	</div>
	<button aria-label="Menu" onclick={openSidebar} type="button" class="menu p-1 md:hidden">
		<svg
			version="1.1"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 122.88 95.95"
			style="enable-background:new 0 0 122.88 95.95"
			xml:space="preserve"
		>
			<g>
				<path
					class="st0"
					fill="white"
					d="M8.94,0h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,17.88,0,13.86,0,8.94l0,0 C0,4.02,4.02,0,8.94,0L8.94,0z M8.94,78.07h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105 C4.02,95.95,0,91.93,0,87.01l0,0C0,82.09,4.02,78.07,8.94,78.07L8.94,78.07z M8.94,39.03h105c4.92,0,8.94,4.02,8.94,8.94l0,0 c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,56.91,0,52.89,0,47.97l0,0C0,43.06,4.02,39.03,8.94,39.03L8.94,39.03z"
				/>
			</g>
		</svg>
	</button>
	<div class="hidden items-center gap-4 md:flex">
		<div>
			{auth.user?.name}
		</div>
		<button
			onclick={logout}
			type="button"
			class="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
			>Logout</button
		>
	</div>
</div>

<style>
	.menu svg {
		width: 24px;
		height: 24px;
	}
</style>
