<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}

<style lang="scss">
	:global(.btn) {
		transition: all ease-out 0.3s;

		@apply cursor-pointer;

		@include isHoverable {
			&:hover {
				filter: brightness(85%);
			}
		}
	}

	:global(a) {
		transition: all ease-out 0.3s;

		@apply cursor-pointer;

		@include isHoverable {
			&:hover {
				@apply underline;
			}
		}
	}
</style>
