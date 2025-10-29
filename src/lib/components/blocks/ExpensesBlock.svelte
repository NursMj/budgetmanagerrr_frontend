<script lang="ts">
	import Item from './items/Item.svelte';
	import AddItem from './items/AddItem.svelte';
	import { moneyPoolBlocks } from '$lib/states/transaction.svelte';

	import type { MoneyPool } from '$lib/types/transaction.ts';

	const items: MoneyPool[] = [
		{ id: 1, name: 'Food', total: '15000', type: 'expenses' },
		{ id: 2, name: 'Sadaqa', total: '10000', type: 'expenses' },
		{ id: 3, name: 'Gas', total: '15000', type: 'expenses' },
		{ id: 4, name: 'Children', total: '10000', type: 'expenses' },
		{ id: 5, name: 'Rest', total: '15000', type: 'expenses' }
	];

	const onHistoryClick = (category: string) => {
		alert('Soon you will be able to see history of this Expenses category ' + category);
	};

	const onClickAddNew = () => {
		alert('Soon you will be able to add new Expenses category');
	};

	const totalInThisMonth = $derived(moneyPoolBlocks.expenses.reduce((total, current) => total + +current.total, 0));
</script>

<div class="mb-3 lg:mb-6">
	<div class="mb-2 flex items-baseline justify-between lg:mb-3">
		<h3 class="text-lg">Expenses</h3>
		<span class="text-sm">In this month: {totalInThisMonth}</span>
	</div>
	<div class="flex flex-wrap gap-3">
		{#each moneyPoolBlocks.expenses as item}
			<Item {item} {onHistoryClick} />
		{/each}
		<AddItem type={'expenses'} onClick={onClickAddNew} />
	</div>
</div>
