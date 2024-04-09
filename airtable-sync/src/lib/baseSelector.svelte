<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchBases } from '$lib/fetchBases';
    import { receivingBase } from '$lib/receivingBaseStore'; // Adjust the import path as necessary

    let bases = [];
    let selectedBaseId: string | undefined; // Initialize with undefined or a specific base ID

    $: receivingBase.set(selectedBaseId);

    onMount(async () => {
        bases = await fetchBases();
        // Optionally initialize selectedBaseId with the first base's ID
        if (bases.length > 0 && !selectedBaseId) {
            selectedBaseId = bases[0].id;
        }
    });
</script>

<select bind:value={selectedBaseId} class="w-full">
    {#each bases as base}
        <option value={base.id}>{base.name}</option>
    {/each}
</select>
