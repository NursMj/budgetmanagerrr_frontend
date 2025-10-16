<script lang="ts">
	import Item from './Item.svelte';

	const items = [
		{ name: 'Salary', total: '110000', operation_type: 'outcome' },
		{ name: 'Gifts', total: '20000', operation_type: 'outcome' }
	];

	const onHistoryClick = () => {
		alert('Soon you will be able to see history of this Income sorce');
	};

	const onOperationClick = () => {
		alert('Soon you will be able to write new Income');
	};
</script>

<div class="mb-6">
	<h3 class="mb-3 text-lg">Incomes</h3>
	<div class="flex gap-3">
		{#each items as item}
			<Item {item} {onHistoryClick} {onOperationClick} />
		{/each}
	</div>
</div>
