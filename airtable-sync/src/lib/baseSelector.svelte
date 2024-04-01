<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { fetchBases } from '../lib/fetchBases';

    // Assuming receivingBase is defined in a separate file, similar to this
    export const receivingBase = writable(null);

    let bases = [];
    let selectedBaseId = ''; // Local variable to bind with the dropdown

    onMount(async () => {
        const fetchedBases = await fetchBases();
        bases = fetchedBases;
        if (bases.length > 0) {
            selectedBaseId = bases[0].id; // Optionally initialize with the first base ID
            receivingBase.set(selectedBaseId); // Update the receivingBase store
        }
    });

    // Update the receivingBase store whenever the selection changes
    $: receivingBase.set(selectedBaseId);
</script>

<select bind:value={selectedBaseId}>
    {#each bases as base}
        <option value={base.id}>{base.name}</option>
    {/each}
</select>
