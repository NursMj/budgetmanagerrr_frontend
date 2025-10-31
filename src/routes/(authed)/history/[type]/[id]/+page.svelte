<script lang="ts">
	import type { PageProps } from './$types';
	import type { Transaction } from '$lib/types/transaction';

	let { data }: PageProps = $props();

	interface GroupedTransactions {
		dateInfo: {
			date: Date;
			dateString: string;
			isToday: boolean;
			isYesterday: boolean;
			dayOfTheWeek: string;
		};
		transactions: Transaction[];
	}

	const transactionsGroupedByDate: GroupedTransactions[] = $derived(
		data.transactions.reduce((groups, transaction) => {
			const stringDate = new Date(transaction.date).toLocaleDateString();
			if (!groups.find((g) => g.dateInfo.dateString === stringDate)) {
				groups.push({
					dateInfo: {
                        date: transaction.date,
						dateString: stringDate,
						isToday: new Date(transaction.date).toDateString() === new Date().toDateString(),
						isYesterday:
							new Date(transaction.date).toDateString() ===
							new Date(new Date().setDate(new Date().getDate() - 1)).toDateString(),
						dayOfTheWeek: new Date(transaction.date).toLocaleDateString('en-US', {
							weekday: 'short'
						})
					},
					transactions: [transaction]
				});
			} else {
				groups[groups.findIndex((g) => g.dateInfo.dateString === stringDate)].transactions.push(
					transaction
				);
			}
			return groups;
		}, [] as GroupedTransactions[])
		.sort((a, b) => new Date(b.dateInfo.date).getTime() - new Date(a.dateInfo.date).getTime())
	);
</script>

<h1>History of <strong>{data.name}</strong> {data.type}</h1>

{#each transactionsGroupedByDate as { dateInfo, transactions }}
	<h2 class="transaction-date-header my-4 text-lg font-semibold">
		{#if dateInfo.isToday}
			Today
		{:else if dateInfo.isYesterday}
			Yesterday
		{:else}
			{dateInfo.dayOfTheWeek}
		{/if},
		{dateInfo.dateString}
	</h2>

	{#each transactions as transaction}
		<div class="transaction-item flex border-b border-gray-300 p-1.5 lg:p-3">
			<div class="transaction-from w-1/4 text-sm">{transaction.from.name}</div>
			<div class="transaction-to w-1/4 text-sm">{transaction.to.name}</div>
			<div class="transaction-amount w-1/4 text-sm font-medium">{transaction.amount}</div>
		</div>
	{/each}
{/each}
