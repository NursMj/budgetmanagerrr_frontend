<script lang="ts">
	import Item from './items/Item.svelte';
	import AddItem from './items/AddItem.svelte';

	const items = [
		{ name: 'Food', total: '15000', type: "expenses" },
		{ name: 'Sadaqa', total: '10000', type: "expenses" },
		{ name: 'Gas', total: '15000', type: "expenses" },
		{ name: 'Children', total: '10000', type: "expenses" },
		{ name: 'Rest', total: '15000', type: "expenses" },
	];

	const onHistoryClick = (category: string) => {
		alert('Soon you will be able to see history of this Expenses category ' + category);
	};
	
	const onClickAddNew = () => {
		alert('Soon you will be able to add new Expenses category');
	};

	const totalInThisMonth = $derived(items.reduce((total, current) => total + +current.total, 0))
</script>

<div class="mb-3 lg:mb-6">
	<div class="mb-2 lg:mb-3 flex justify-between items-baseline">
		<h3 class="text-lg">Expenses</h3>
		<span class="text-sm">In this month: {totalInThisMonth}</span>
	</div>
	<div class="flex gap-3 flex-wrap">
		{#each items as item}
			<Item {item} {onHistoryClick} />
		{/each}
		<AddItem type={"expenses"} onClick={onClickAddNew}  />
	</div>
</div>
