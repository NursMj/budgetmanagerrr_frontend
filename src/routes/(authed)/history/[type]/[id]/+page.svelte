<script lang="ts">
	import { page } from '$app/state';

	console.log('page.params :>> ', page.params);

    const type = page.params.type;
    const id = +page.params.id;
</script>

<h1>History page of {type} with id <strong>{id}</strong></h1>
