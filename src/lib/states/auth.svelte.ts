import { browser } from '$app/environment';
// import { untrack } from 'svelte';

import type { User, AuthUser } from '$lib/types';

const auth: AuthUser = $state(getInitialAuthState());

function getInitialAuthState(): AuthUser {
	if (!browser) return { user: null, accessToken: null, isAuth: false };

	const stored = sessionStorage.getItem('auth');
	if (stored) {
		try {
			return JSON.parse(stored);
		} catch {
			return { user: null, accessToken: null, isAuth: false };
		}
	}
	return { user: null, accessToken: null, isAuth: false };
}

export const setAuth = (user: User, accessToken: string) => {
	auth.user = user;
	auth.accessToken = accessToken;
	auth.isAuth = true;

	if (browser) {
		sessionStorage.setItem('auth', JSON.stringify(auth));
	}
};

export const clearAuth = () => {
	auth.user = null;
	auth.accessToken = null;
	auth.isAuth = false;
	if (browser) {
		sessionStorage.removeItem('auth');
	}
};

export { auth };
