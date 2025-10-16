<script lang="ts">
	import Item from './Item.svelte';

	const items = [
		{ name: 'Wallet', total: '110000', operation_type: 'income' },
		{ name: 'Card', total: '20000', operation_type: 'income' }
	];

	const onHistoryClick = () => {
		alert('Soon you will be able to see history of this Account');
	};

	const onOperationClick = () => {
		alert('Soon you will be able to operate from this Account');
	};
</script>

<div class="mb-6">
	<h3 class="mb-3 text-lg">Accounts</h3>
	<div class="flex gap-3">
		{#each items as item}
			<Item {item} {onHistoryClick} {onOperationClick} />
		{/each}
	</div>
</div>
