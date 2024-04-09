<script lang="ts">
    import Sidebar from '$lib/sidebar.svelte';
    import BaseSchema from '$lib/baseSchema.svelte';
    import ReceivingSchema from '$lib/receivingSchema.svelte';
    import ChangesSchema from '$lib/changesSchema.svelte';
</script>

<div class="flex flex-row bg-slate-300 p-4">
    <Sidebar />
    <div class="flex flex-row bg-white w-full p-4 rounded-lg gap-4">
        <div class="w-1/3">
            <BaseSchema />
        </div>
        <div class="w-1/3">
            <ChangesSchema />
        </div>
        <div class="w-1/3">
            <ReceivingSchema />
        </div>
    </div>
</div>
