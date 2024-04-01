<script lang="ts">
    import { onMount } from 'svelte';
    import { receivingBase } from '$lib/stores'; // Assuming you have a store for the selected base
    import { fetchBaseSchema } from './fetchSchema';

    let tables = [];
    let toggledTableId = null; // State to track which table's fields are visible

    // Reactively fetch the schema whenever the selected base changes
    $: if ($receivingBase) {
        fetchBaseSchema($receivingBase).then(fetchedTables => {
            tables = fetchedTables;
        });
    }

    function toggleTable(tableId: string) {
        toggledTableId = toggledTableId === tableId ? null : tableId;
    }
</script>

<div>
    <h1>Receiving Schema</h1>
    <ul>
        {#each tables as table}
            <li>
                <button on:click={() => toggleTable(table.id)}>{table.name}</button>
                {#if toggledTableId === table.id}
                    <ul>
                        {#each table.fields as field}
                            <li>{field.name} ({field.type})</li>
                        {/each}
                    </ul>
                {/if}
            </li>
        {/each}
    </ul>
</div>
