<script lang="ts">
	import Item from './Item.svelte';
	import AddItem from './AddItem.svelte';

	const items = [
		{ name: 'Food', total: '15000' },
		{ name: 'Sadaqa', total: '10000' },
		{ name: 'Gas', total: '15000' },
		{ name: 'Children', total: '10000' },
		{ name: 'Rest', total: '15000' },
	];

	const onHistoryClick = (category: string) => {
		alert('Soon you will be able to see history of this Expenses category ' + category);
	};
	
	const onClickAddNew = () => {
		alert('Soon you will be able to add new Expenses category');
	};
</script>

<div class="mb-3 lg:mb-6">
	<h3 class="mb-2 lg:mb-3 text-lg">Expenses</h3>
	<div class="flex gap-3 flex-wrap">
		{#each items as item}
			<Item {item} {onHistoryClick} />
		{/each}
		<AddItem type={"Expenses"} onClick={onClickAddNew}  />
	</div>
</div>
