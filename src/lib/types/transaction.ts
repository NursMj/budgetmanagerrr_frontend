type MoneyPoolType = 'income' | 'account' | 'expenses';

interface MoneyPool {
	id: number;
	name: string;
	total: string;
	type: MoneyPoolType;
	operation_type?: 'income' | 'outcome';
}

interface Transaction {
	from: MoneyPool;
	to: MoneyPool;
	date: Date;
	amount: number;
	comment: string;
}

export type { MoneyPool, Transaction };
