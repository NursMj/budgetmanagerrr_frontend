import { auth, clearAuth, setAuth } from '$lib/states/auth.svelte';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { PUBLIC_BASE_URL } from '$env/static/public';
import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
	AxiosError
} from 'axios';
import type { User } from '$lib/types';

interface AuthData {
	user: User;
	access_token: string;
}

class ApiClient {
	private client: AxiosInstance;
	private baseURL: string;

	constructor() {
		this.baseURL = PUBLIC_BASE_URL;
		this.client = axios.create({
			baseURL: this.baseURL,
			withCredentials: true, // Important for cookies
			headers: {
				'Content-Type': 'application/json'
			}
		});

		this.setupInterceptors();
	}

	private setupInterceptors(): void {
		// Request interceptor to add auth token
		this.client.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				// Add access token to headers if available
				if (auth.accessToken) {
					config.headers.Authorization = `Bearer ${auth.accessToken}`;
				}
				return config;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		// Response interceptor to handle token refresh
		this.client.interceptors.response.use(
			(response: AxiosResponse) => response,
			async (error: AxiosError) => {
				const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

				// If token is expired and we haven't retried yet, try to refresh
				if (
					error.response?.status === 401 &&
					!originalRequest._retry &&
					originalRequest.url !== '/auth/refresh'
				) {
					originalRequest._retry = true;

					try {
						await this.refreshToken();

						// Retry original request with new token
						if (auth.accessToken) {
							originalRequest.headers.Authorization = `Bearer ${auth.accessToken}`;
						}

						return this.client(originalRequest);
					} catch {
						// Refresh failed, redirect to login
						clearAuth();
						if (browser) {
							goto('/signin');
						}
						return Promise.reject(new Error('Authentication failed'));
					}
				}

				return Promise.reject(error);
			}
		);
	}

	async refreshToken(): Promise<void> {
		const response = await this.client.post<AuthData>('/auth/refresh');
		setAuth(response.data.user, response.data.access_token);
	}

	// Convenience methods
	async get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.get<T>(endpoint, config);
		return response.data;
	}

	async post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.post<T>(endpoint, data, config);
		return response.data;
	}

	async put<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.put<T>(endpoint, data, config);
		return response.data;
	}

	async patch<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.patch<T>(endpoint, data, config);
		return response.data;
	}

	async delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.delete<T>(endpoint, config);
		return response.data;
	}

	async upload<T = any>(
		endpoint: string,
		formData: FormData,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response = await this.client.post<T>(endpoint, formData, {
			...config,
			headers: {
				...config?.headers,
				'Content-Type': 'multipart/form-data'
			}
		});
		return response.data;
	}

	// Method to get the underlying axios instance if needed
	getClient(): AxiosInstance {
		return this.client;
	}
}

export const api = new ApiClient();
