type MoneyPoolType = 'income' | 'account' | 'expenses';

interface MoneyPool {
	id: number;
	name: string;
	total: string;
	type: MoneyPoolType;
	operation_type?: 'income' | 'outcome';
}

interface Transaction {
	id: number;
	from: MoneyPool;
	to: MoneyPool;
	date: Date;
	amount: number;
	comment: string;
}

interface MoneyPoolWithTransactions extends MoneyPool {
	transactions: Transaction[];
}

export type { MoneyPool, Transaction, MoneyPoolWithTransactions, MoneyPoolType };
