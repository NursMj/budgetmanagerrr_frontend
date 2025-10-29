<script lang="ts">
	const { children, onClose } = $props();
</script>

<div class="z-index-100 fixed inset-0 bg-black opacity-40"></div>

<div class="z-index-101 absolute top-1/2 left-1/2 -translate-1/2">
	<div class="releative rounded-lg bg-white p-3">
		<button
			aria-label="close"
			onclick={onClose}
			class="btn absolute top-2 right-2 h-6 w-6 rounded-full bg-indigo-400 lg:top-0 lg:-right-8"
		>
			<svg stroke="white" viewBox="0 0 24 24">
				<path d="M6 6l12 12M18 6L6 18" />
			</svg>
		</button>
		<div class="contet">
			{@render children()}
		</div>
	</div>
</div>
