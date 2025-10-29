<script lang="ts">
	import { slide } from 'svelte/transition';
	import Item from './items/Item.svelte';
	import AddItem from './items/AddItem.svelte';
	import type { MoneyPool } from '$lib/types/transaction.ts';

	const items: MoneyPool[] = [
		{ id: 1, name: 'Salary', total: '110000', type: 'income', operation_type: 'income' }
	];

	let opened = $state(true);

	const onHistoryClick = () => {
		alert('Soon you will be able to see history of this Income sorce');
	};

	const onOperationClick = (item: MoneyPool) => {
		alert('Soon you will be able to write new Income');
	};

	const onClickAddNew = () => {
		alert('Soon you will be able to add new Income');
	};

	const totalInThisMonth = $derived(items.reduce((total, current) => total + +current.total, 0));
</script>

<div class="mb-3 lg:mb-6">
	<div class="mb-2 flex items-center justify-between gap-2 lg:mb-3">
		<div class="flex flex-grow items-baseline justify-between">
			<h3 class="text-lg">Incomes</h3>
			<span class="text-sm">In this month: {totalInThisMonth}</span>
		</div>
		<button
			class="btn"
			style="transform: rotate({opened ? 180 : 0}deg); transition: all ease .3s"
			aria-label="Close"
			onclick={() => (opened = !opened)}
		>
			<svg
				width="24px"
				height="24px"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				transform="rotate(90)"
				><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				></g><g id="SVGRepo_iconCarrier">
					<path
						d="M9 6L15 12L9 18"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
				</g></svg
			>
		</button>
	</div>

	{#if opened}
		<div class="w-full max-w-full overflow-auto" transition:slide>
			<div class="flex gap-3">
				{#each items as item}
					<Item {item} {onHistoryClick} {onOperationClick} />
				{/each}

				<AddItem type={'income'} onClick={onClickAddNew} />
			</div>
		</div>
	{/if}
</div>
