<script lang="ts">
	import { transactionMadal } from '$lib/states/interface.svelte';
	import Modal from '$lib/shared/ui/modal.svelte';
	import TransactionDropDown from '$lib/components/dropDowns/TransactionDropDown.svelte';
	import { transferFrom, transaction, moneyPoolBlocks } from '$lib/states/transaction.svelte';

	import type { MoneyPool } from '$lib/types/transaction.ts';

	interface MoneyPoolGroup {
		group: string;
		options: MoneyPool[];
	}

	const onClose = () => {
		transferFrom.value = null;
		transaction.value = null;
		transactionMadal.opened = false;
	};

	const transferFromList: MoneyPoolGroup[] = [
		{
			group: 'Incomes',
			options: moneyPoolBlocks.incomes
		}
	];
	const transferToList: MoneyPoolGroup[] = [
		{
			group: 'Accounts',
			options: moneyPoolBlocks.accounts
		},
		{
			group: 'Expenses',
			options: moneyPoolBlocks.expenses
		}
	];

	let from = $state(transferFrom.value || transaction.value?.from || null);
	let to = $state(transaction.value?.to || null);
	let transferAmount = $state(transaction.value?.amount || null);
	let transactionDate: Date = $state(transaction.value?.date || new Date());
	let formattedDate = $derived(transactionDate.toLocaleDateString());
</script>

<Modal {onClose}>
	<div class="flex w-80 flex-col gap-2">
		<h3 class="text-center">Transaction</h3>

		<div class="flex flex-col gap-0.5">
			<div class="flex items-center gap-2">
				<span class="w-10"> From: </span>
				<TransactionDropDown
					name="from_dropdown"
					disabled={Boolean(transferFrom.value)}
					options={transferFromList}
					placeholder="Where money comes from"
					bind:selectedValue={from}
				/>
			</div>

			<div class="flex items-center gap-2">
				<span class="w-10"> To: </span>
				<TransactionDropDown
					name="to_dropdown"
					options={transferToList}
					placeholder="Where money goes"
					bind:selectedValue={to}
				/>
			</div>
		</div>

		<input
			class="rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			type="number"
			placeholder="How much"
			value={transferAmount}
		/>

		<div class="btns flex flex-col gap-1">
			<div class="flex gap-2">
				<button class="btn flex-1 rounded bg-blue-400 p-1.5 text-white">{formattedDate}</button>
				<button class="btn flex-1 rounded bg-indigo-400 p-1.5 text-white">Comment</button>
			</div>
			<button class="btn w-full rounded bg-orange-400 p-1.5 text-white">Save</button>
		</div>
	</div>
</Modal>


