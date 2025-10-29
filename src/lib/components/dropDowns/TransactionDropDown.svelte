<script lang="ts">
	import type { MoneyPool } from '$lib/types/transaction.ts';

	interface MoneyPoolGroup {
		group: string;
		options: MoneyPool[];
	}

	interface Props {
		name: string;
		options: MoneyPoolGroup[];
		placeholder?: string;
		selectedValue?: MoneyPool | null;
		disabled?: boolean;
	}

	let {
		name,
		options = [],
		placeholder = 'Select an option',
		selectedValue = $bindable(),
		disabled = false
	}: Props = $props();
	let isOpen = $state(false);

	$effect(() => {
		if (!isOpen) return;

		function handleClickOutside(event: MouseEvent) {
			const target = event.target as Element;
			if (!target.closest?.(`.dropdown-container_${name}`)) {
				isOpen = false;
			}
		}

		const timeout = setTimeout(() => {
			window.addEventListener('click', handleClickOutside);
		});

		return () => {
			clearTimeout(timeout);
			window.removeEventListener('click', handleClickOutside);
		};
	});

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectOption(option: MoneyPool) {
		selectedValue = option;
		isOpen = false;
	}
</script>

<div class="dropdown-container relative flex-1 dropdown-container_${name}" class:{disabled}>
	<button
		{disabled}
		type="button"
		class="btn w-full rounded-md bg-white px-4 py-2 text-left focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		onclick={toggleDropdown}
	>
		<span class={!selectedValue ? 'text-gray-500' : 'text-gray-900'}>
			{selectedValue ? selectedValue?.name : placeholder}
		</span>
		{#if !disabled}
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
				<svg
					class="h-5 w-5 text-gray-400 transition-transform duration-200"
					class:rotate-180={isOpen}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</span>
		{/if}
	</button>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div
			class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg focus:outline-none"
		>
			<div class="py-1">
				<div class="w-full px-4 py-2 text-left text-gray-500">
					{placeholder}
				</div>

				<!-- Options with groups -->
				{#each options as group}
					<!-- Group header -->
					<div
						class="border-t border-b border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 first:border-t-0"
					>
						{group.group}
					</div>

					<!-- Group options -->
					{#each group.options as option (option.id)}
						<button
							type="button"
							class="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none {selectedValue?.id ===
								option.id && selectedValue?.type === option.type
								? 'bg-blue-50 text-blue-700'
								: 'text-gray-700'}"
							onclick={() => selectOption(option)}
						>
							{option.name}
						</button>
					{/each}
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.max-h-60::-webkit-scrollbar {
		width: 6px;
	}
	.max-h-60::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 3px;
	}
	.max-h-60::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 3px;
	}
	.max-h-60::-webkit-scrollbar-thumb:hover {
		background: #a8a8a8;
	}
</style>
