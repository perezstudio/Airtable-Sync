<script lang="ts">
    import Sidebar from '$lib/sidebar.svelte';
    import BaseSchema from '$lib/baseSchema.svelte';
    import ReceivingSchema from '$lib/receivingSchema.svelte';
    import ChangesSchema from '$lib/changesSchema.svelte';
</script>

<div class="grid grid-cols-7 bg-gray-200 gap-2 p-4 h-screen min-h-screen overflow-hidden">
    <aside class="self-start sticky top-0 col-span-1 h-screen overflow-scroll py-4">
        <Sidebar />
    </aside>
    <div class="col-span-6 grid grid-cols-3 bg-white p-4 rounded-lg gap-4 h-screen overflow-y-scroll">
        <div class="col-span-1 overflow-scroll">
            <BaseSchema />
        </div>
        <div class="col-span-1 overflow-scroll">
            <ChangesSchema />
        </div>
        <div class="col-span-1 hover:overflow-scroll">
            <ReceivingSchema />
        </div>
    </div>
</div>
