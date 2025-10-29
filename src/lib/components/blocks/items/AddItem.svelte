<script lang="ts">
	const { type, onClick } = $props();
</script>

<button
    onclick={onClick}
	class="btn bg-white add-item relative cursor-pointer flex w-20 flex-shrink-0 min-h-[86px] flex-col items-center justify-center rounded border-2 border-dashed px-1.5 py-0.5"
	style="
		--color: var(--{type}-color);
	"
>
	<span class="w-fit absolute top-0.5 capitalize">{type}</span>
	<span class="plus text-4xl">+</span>
</button>

<style lang="scss">
	.add-item {
		border-color: var(--color);
		.plus {
			color: var(--color);
		}
	}
</style>