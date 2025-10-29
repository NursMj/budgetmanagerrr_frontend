<script lang="ts">
	import Item from './items/Item.svelte';
	import AddItem from './items/AddItem.svelte';
	import { transactionMadal } from '$lib/states/interface.svelte';
	import { transferFrom, moneyPoolBlocks } from '$lib/states/transaction.svelte';

	import type { MoneyPool } from '$lib/types/transaction.ts';

	const onHistoryClick = () => {
		alert('Soon you will be able to see history of this Account');
	};

	const onOperationClick = (item: MoneyPool) => {
		transferFrom.value = item;
		transactionMadal.opened = true;
	};

	const onClickAddNew = () => {
		alert('Soon you will be able to add new Account');
	};

	const totalBalance = $derived(moneyPoolBlocks.accounts.reduce((total, current) => total + +current.total, 0));
</script>

<div class="mb-3 lg:mb-6">
	<div class="mb-2 flex items-baseline justify-between lg:mb-3">
		<h3 class="text-lg">Accounts</h3>
		<span class="text-sm">Balance: {totalBalance}</span>
	</div>
	<div class="w-full max-w-full overflow-auto">
		<div class="flex gap-3">
			{#each moneyPoolBlocks.accounts as item}
				<Item {item} {onHistoryClick} {onOperationClick} />
			{/each}
			<AddItem type={'account'} onClick={onClickAddNew} />
		</div>
	</div>
</div>
