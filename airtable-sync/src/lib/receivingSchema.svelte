<script lang="ts">
    import { onMount } from 'svelte';
    import { receivingBase } from '$lib/receivingBaseStore'; // Assuming you have a store for the selected base
    import { fetchBaseSchema } from '$lib/fetchSchema';
    import BaseSelector from '$lib/baseSelector.svelte';
    import { receivingSchema } from '$lib/schemaStore';

    let tables = [];
    let toggledTableId = null; // State to track which table's fields are visible

    $: if ($receivingBase) {
        fetchBaseSchema($receivingBase).then(fetchedTables => {
            tables = fetchedTables;
            receivingSchema.set(tables);
        });
    }

    function toggleTable(tableId: string) {
        toggledTableId = toggledTableId === tableId ? null : tableId;
    }
</script>

<div class="w-full flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <h1 class="uppercase text-sm font-bold text-slate-400 w-full">Receiving Base</h1>
        <BaseSelector bind:selectedBaseId={$receivingBase} />
    </div>
    <ul>
        {#each tables as table}
            <li>
                <button class="flex flex-row justify-left rounded-md text-lg w-full font-bold text-slate-600 py-1 px-1.5 hover:bg-slate-200" on:click={() => toggleTable(table.id)}>{table.name}</button>
                {#if toggledTableId === table.id}
                    <ul>
                        {#each table.fields as field}
                            <li class="flex flex-row justify-between">
                                <p>{field.name}</p><p>{field.type}</p>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </li>
        {/each}
    </ul>
</div>
