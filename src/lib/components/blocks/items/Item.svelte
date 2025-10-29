<script lang="ts">
	import type { MoneyPool } from '$lib/types/transaction.ts';

	interface Props {
		item: MoneyPool;
		onOperationClick?: (moneyPool: MoneyPool) => void;
	}

	const { item, onOperationClick }: Props = $props();
</script>

<div
	class="item flex w-20 flex-shrink-0 flex-col items-center rounded border-2 border-solid px-1.5 py-0.5"
	style="--color: var(--{item.type}-color)"
>
	<span class="w-fit">{item.name}</span>
	<div class="flex flex-col items-center gap-2">
		<a
			href="history/{item.type}/{item.id}"
			class="btn btn_history cursor-pointer rounded p-1 text-white">History</a
		>
		{#if item.operation_type && onOperationClick}
			<button
				onclick={() => onOperationClick(item)}
				class="btn btn_action flex w-full cursor-pointer justify-center rounded p-1"
				aria-label="outcome"
				><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
					><path
						class="fill-white"
						d="M0 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v6h8V5l5 5-5 5v-3z"
					/></svg
				>
			</button>
		{/if}
	</div>

	<span class="total w-fit">{item.total}</span>
</div>

<style lang="scss">
	.item {
		border-color: var(--color);

		.btn {
			background-color: var(--color);
		}

		.total {
			color: var(--color);
		}
	}
</style>
