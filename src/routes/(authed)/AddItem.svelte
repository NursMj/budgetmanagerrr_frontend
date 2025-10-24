<script lang="ts">
	const { type, onClick } = $props();
</script>

<button
    onclick={onClick}
	class="relative cursor-pointer flex w-20 flex-shrink-0 min-h-[86px] flex-col items-center justify-center rounded border border-dashed border-indigo-400 px-1.5 py-0.5"
>
	<span class="w-fit absolute top-0.5">{type}</span>
	<span class="text-4xl">+</span>
</button>
