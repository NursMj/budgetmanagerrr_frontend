<script lang="ts">
	import Item from './Item.svelte';

	const items = [
		{ name: 'Food', total: '15000' },
		{ name: 'Sadaqa', total: '10000' }
	];

	const onHistoryClick = (category: string) => {
		alert('Soon you will be able to see history of this Expenses category ' + category);
	};
</script>

<div class="mb-6">
	<h3 class="mb-3 text-lg">Expenses</h3>
	<div class="flex gap-3">
		{#each items as item}
			<Item {item} {onHistoryClick} />
		{/each}
	</div>
</div>
