import type { Transaction, MoneyPool } from '$lib/types/transaction.ts';

const transferFrom: { value: MoneyPool | null } = $state({ value: null });

const transaction: { value: Transaction | null } = $state({
	value: null
});

const moneyPoolBlocks: Record<string, MoneyPool[]> = $state({
	incomes: [{ id: 1, name: 'Salary', total: '110000', type: 'income', operation_type: 'income' }],
	accounts: [
		{ id: 1, name: 'Wallet', total: '110000', type: 'account', operation_type: 'outcome' },
		{ id: 2, name: 'Card', total: '20000', type: 'account', operation_type: 'outcome' }
	],
	expenses: [
		{ id: 1, name: 'Food', total: '15000', type: 'expenses' },
		{ id: 2, name: 'Sadaqa', total: '10000', type: 'expenses' },
		{ id: 3, name: 'Gas', total: '15000', type: 'expenses' },
		{ id: 4, name: 'Children', total: '10000', type: 'expenses' },
		{ id: 5, name: 'Rest', total: '15000', type: 'expenses' }
	]
});

export { transaction, transferFrom, moneyPoolBlocks };
