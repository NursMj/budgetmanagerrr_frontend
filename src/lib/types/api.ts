export interface User {
	id: number;
	name: string;
	email: string;
}

interface Authenticated {
	isAuth: true;
	user: User;
	accessToken: string;
}

interface Unauthenticated {
	isAuth: false;
	user: null;
	accessToken: null;
}

export type AuthUser = Authenticated | Unauthenticated;
