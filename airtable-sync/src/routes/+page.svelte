<script lang="ts">
    import Sidebar from '$lib/sidebar.svelte';
    import BaseSchema from '$lib/baseSchema.svelte';
    import ReceivingSchema from '$lib/receivingSchema.svelte';
</script>

<div class="flex flex-row">
    <Sidebar />
    <BaseSchema />
    <ReceivingSchema />
</div>
