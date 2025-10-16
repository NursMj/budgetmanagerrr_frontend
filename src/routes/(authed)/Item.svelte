<script lang="ts">
	const { item, onHistoryClick, onOperationClick = null } = $props();
</script>

<div
	class="acount flex w-20 flex-col items-center rounded border border-solid border-indigo-400 px-1.5 py-0.5"
>
	<span class="w-fit">{item.name}</span>
	<div class="flex flex-col items-center gap-2">
		<button onclick={() => onHistoryClick(item.name)} class="cursor-pointer rounded bg-indigo-400 p-1 text-white"
			>History</button
		>
		{#if item.operation_type}
			<button
				onclick={onOperationClick}
				class="flex w-full cursor-pointer justify-center rounded border border-solid border-indigo-400 p-1"
				aria-label="outcome"
				><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
					><path
						class="fill-current text-indigo-400"
						d="M0 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v6h8V5l5 5-5 5v-3z"
					/></svg
				>
			</button>
		{/if}
	</div>

	<span class="w-fit text-indigo-400">{item.total}</span>
</div>
