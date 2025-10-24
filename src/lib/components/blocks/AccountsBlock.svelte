<script lang="ts">
	import Item from './items/Item.svelte';
	import AddItem from './items/AddItem.svelte';

	const items = [
		{ name: 'Wallet', total: '110000', type: "account", operation_type: 'outcome' },
		{ name: 'Card', total: '20000', type: "account", operation_type: 'outcome' }
	];

	const onHistoryClick = () => {
		alert('Soon you will be able to see history of this Account');
	};

	const onOperationClick = () => {
		alert('Soon you will be able to operate from this Account');
	};

	const onClickAddNew = () => {
		alert('Soon you will be able to add new Account');
	};

	const totalBalance = $derived(items.reduce((total, current) => total + +current.total, 0))
</script>

<div class="mb-3 lg:mb-6">
	<div class="mb-2 lg:mb-3 flex justify-between items-baseline">
		<h3 class="text-lg">Accounts</h3>
		<span class="text-sm">Balance: {totalBalance}</span>
	</div>
	<div class="w-full max-w-full overflow-auto">
		<div class="flex gap-3">
			{#each items as item}
				<Item {item} {onHistoryClick} {onOperationClick} />
			{/each}
			<AddItem type={"account"} onClick={onClickAddNew}  />
		</div>
	</div>
</div>
