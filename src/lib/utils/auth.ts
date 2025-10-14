import { api } from '$lib/api/client';
import { auth, clearAuth, setAuth } from '$lib/states/auth.svelte';
import { goto } from '$app/navigation';
import type { User } from '$lib/types';

interface LoginResponse {
	success: true;
	data: { user: User; access_token: string };
}

interface AuthFailResult {
	success: false;
	error: string;
}

interface AuthSuccessResult {
	success: true;
}

type AuthResult = AuthFailResult | AuthSuccessResult;

export async function login(email: string, password: string): Promise<AuthResult> {
	try {
		const data = await api.post<LoginResponse>('/auth/', { email, password });

		setAuth(data.data.user, data.data.access_token);
		return { success: true };
	} catch (error: any) {
		return {
			success: false,
			error: error.response?.data?.message || error.message || 'Login failed'
		};
	}
}

export async function logout(): Promise<void> {
	try {
		await api.post('/auth/logout');
	} catch (error) {
		console.error('Logout error:', error);
	} finally {
		clearAuth();
		goto('/signin');
	}
}

export async function initializeAuth(): Promise<boolean> {
	if (auth.accessToken) {
		try {
			await api.get<User>('/auth/me');
			return true;
		} catch {
			try {
				await api.refreshToken();
				return true;
			} catch {
				clearAuth();
				return false;
			}
		}
	}

	try {
		await api.refreshToken();
		return true;
	} catch {
		return false;
	}
}

export async function register(userData: {
	email: string;
	password: string;
	name: string;
}): Promise<AuthResult> {
	try {
		const data = await api.post<LoginResponse>('/user', userData);
		setAuth(data.data.user, data.data.access_token);

		return { success: true };
	} catch (error: any) {
		return {
			success: false,
			error: error.response?.data?.message || error.message || 'Registration failed'
		};
	}
}
