<script lang="ts">
	import { create, test, enforce } from 'vest';
	import { goto } from '$app/navigation';
	import { register } from '$lib/utils/auth';

	let name: string = $state('');
	let email: string = $state('');
	let password: string = $state('');
	let confirmPassword: string = $state('');
	let validationResult: ReturnType<typeof validate> | null = $state(null);
	let responceError: string | null = $state(null);
	let loading: boolean = $state(false);

	interface FormData {
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	}

	const validate = create((data: FormData) => {
		test('name', 'Name is required', () => {
			enforce(data.name).isNotEmpty();
		});

		test('name', 'Name can only contain latin letters and spaces', () => {
			enforce(data.name).matches(/^[a-zA-Z ]*$/);
		});

		test('name', 'Name must be at least 3 characters', () => {
			enforce(data.name).longerThan(2);
		});

		test('name', 'Name must be shorter then 50 characters', () => {
			enforce(data.name).shorterThan(50);
		});

		test('email', 'Email is required', () => {
			enforce(data.email).isNotEmpty();
		});

		test('email', 'Please enter a valid email', () => {
			enforce(data.email).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
		});

		test('password', 'Password is required', () => {
			enforce(data.password).isNotEmpty();
		});

		test('password', 'Password must be at least 8 characters', () => {
			enforce(data.password).longerThanOrEquals(8);
		});

		test('confirmPassword', 'Passwords must match', () => {
			enforce(data.confirmPassword).equals(data.password);
		});
	});

	async function handleSubmit(event: Event) {
		event.preventDefault();
		validationResult = validate({ name, email, password, confirmPassword });

		if (validationResult.isValid()) {
			responceError = null;
			loading = true;
			const result = await register({ name, email, password });
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
		<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
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
				<!-- Name Field -->
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
					<div class="mt-1">
						<input
							id="name"
							bind:value={name}
							type="text"
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
							placeholder="John Doe"
						/>
					</div>
					{#if validationResult?.hasErrors('name')}
						<p class="mt-1 text-sm text-red-600">
							{validationResult.getErrors('name')[0]}
						</p>
					{/if}
				</div>

				<!-- Email Field -->
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
					<div class="mt-1">
						<input
							id="email"
							bind:value={email}
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

				<!-- Confirm Password Field -->
				<div>
					<label for="confirmPassword" class="block text-sm font-medium text-gray-700">
						Confirm Password
					</label>
					<div class="mt-1">
						<input
							id="confirmPassword"
							bind:value={confirmPassword}
							type="password"
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
							placeholder="••••••••"
						/>
					</div>
					{#if validationResult?.hasErrors('confirmPassword')}
						<p class="mt-1 text-sm text-red-600">
							{validationResult.getErrors('confirmPassword')[0]}
						</p>
					{/if}
				</div>

				<!-- Submit Button -->
				<div>
					<button
						type="submit"
						class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
					>
						Sign up
					</button>
				</div>
			</form>
		</div>
		<div class="text-center py-6">
			Already have an account? <a class="text-blue-700" href="/signin">Sign in</a>
		</div>
	</div>
</div>
