<script lang="ts">
    import { onMount } from 'svelte';
    import { selectedBase } from '$lib/selectedBaseStore';
    import { fetchBaseSchema } from './fetchSchema';
	import { baseSchema } from '$lib/schemaStore';

    let tables = [];
    let toggledTableId = null; // State to track which table's fields are visible

    // Reactively fetch the schema whenever the selected base changes
    $: if ($selectedBase) {
        fetchBaseSchema($selectedBase).then(fetchedTables => {
            tables = fetchedTables;
            baseSchema.set(tables);
        });
    }

    function toggleTable(tableId: string) {
        toggledTableId = toggledTableId === tableId ? null : tableId;
    }

</script>

<div class="w-full">
    <h1>Primary Base</h1>
    <ul>
        {#each tables as table}
            <li>
                <button on:click={() => toggleTable(table.id)}>{table.name}</button>
                {#if toggledTableId === table.id}
                    <ul>
                        {#each table.fields as field}
                            <li>
                                <p>{field.name}</p><p>{field.type}</p>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </li>
        {/each}
    </ul>
</div>
