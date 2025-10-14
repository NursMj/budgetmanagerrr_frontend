<script lang="ts">
	import { create, test, enforce } from 'vest';
	import { goto } from '$app/navigation';
	import { login } from '$lib/utils/auth';

	let email: string = $state('');
	let password: string = $state('');
	let validationResult: ReturnType<typeof validate> | null = $state(null);
	let responceError: string | null = $state(null);
	let loading: boolean = $state(false);

	interface FormData {
		email: string;
		password: string;
	}

	const validate = create((data: FormData) => {
		test('email', 'Email is required', () => {
			enforce(data.email).isNotEmpty();
		});

		test('email', 'Please enter a valid email', () => {
			enforce(data.email).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
		});

		test('password', 'Password is required', () => {
			enforce(data.password).isNotEmpty();
		});
	});

	async function handleSubmit(event: Event) {
		event.preventDefault();
		validationResult = validate({ email, password });

		if (validationResult.isValid()) {
			responceError = null;
			loading = true;
			const result = await login(email, password);
			loading = false;
			if (result.success) {
				goto('/');
			} else {
				responceError = result.error
			}
		}
	}
</script>

<div class="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
			{#if loading}
				<div class="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin m-auto"></div>
			{/if}

			{#if responceError}
				<p class="text-orange-400 text-center pb-3">Error: {responceError}</p>
			{/if}
			<form class="space-y-6" onsubmit={handleSubmit}>
				<!-- Email Field -->
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
					<div class="mt-1">
						<input
							id="email"
							bind:value={email}
							disabled={loading}
							type="email"
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
							placeholder="you@example.com"
						/>
					</div>
					{#if validationResult?.hasErrors('email')}
						<p class="mt-1 text-sm text-red-600">
							{validationResult.getErrors('email')[0]}
						</p>
					{/if}
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
					<div class="mt-1">
						<input
							id="password"
							bind:value={password}
							disabled={loading}
							type="password"
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
							placeholder="••••••••"
						/>
					</div>
					{#if validationResult?.hasErrors('password')}
						<p class="mt-1 text-sm text-red-600">
							{validationResult.getErrors('password')[0]}
						</p>
					{/if}
				</div>

				<!-- Submit Button -->
				<div>
					<button
						type="submit"
						disabled={loading}
						class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
					>
						Sign in
					</button>
				</div>
			</form>
		</div>

		<div class="py-6 text-center">
			Don't have an account yet? <a class="text-blue-700" href="/signup">Register now</a>
		</div>
	</div>
</div>
