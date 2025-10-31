import type { MoneyPool, MoneyPoolWithTransactions } from '$lib/types/transaction';
import type { PageServerLoad } from './$types';

const getRandomDateFromLastNDays = (days: number = 7): Date => {
	const today = new Date();
	const pastDate = new Date();
	pastDate.setDate(today.getDate() - days);

	const randomTime = pastDate.getTime() + Math.random() * (today.getTime() - pastDate.getTime());
	return new Date(randomTime);
}

const fetchTransactions = async (
	type: MoneyPool['type'],
	id: MoneyPool['id']
): Promise<MoneyPoolWithTransactions> => {
	const mockData = {
		type,
		id,
		name: 'Money Pool ' + id,
		total: '100000',
		transactions: Array.from({ length: 15 }, (_, i) => {
			return {
				id: i + 1,
				from: {
					type,
					id,
					name: 'Money Pool ' + id,
					total: '100000'
				},
				to: {
					type,
					id: id + 1,
					name: 'Mone Pool ' + (id + 1),
					total: '100000'
				},
				date: getRandomDateFromLastNDays(Math.floor(Math.random() * 5)),
				amount: 1000,
				comment: ''
			};
		})
	};
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockData);
		}, 0);
	});
};

export const load: PageServerLoad = async ({ params }): Promise<MoneyPoolWithTransactions> => {
	const type = params.type as MoneyPool['type'];
	const id = +params.id as MoneyPool['id'];
	const moneyPoolWithTransactions = await fetchTransactions(type, id);
	return moneyPoolWithTransactions;
};
