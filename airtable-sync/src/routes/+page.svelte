<script lang="ts">
    import Sidebar from '$lib/sidebar.svelte';
    import BaseSchema from '$lib/baseSchema.svelte';
    import ReceivingSchema from '$lib/receivingSchema.svelte';
    import ChangesSchema from '$lib/changesSchema.svelte';
</script>

<div class="flex flex-row bg-slate-300 p-4">
    <Sidebar />
    <div class="flex flex-row bg-white w-full p-4 rounded-lg">
        <BaseSchema />
        <ChangesSchema />
        <ReceivingSchema />
    </div>
</div>
