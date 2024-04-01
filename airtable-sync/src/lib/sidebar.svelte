<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchBases } from './fetchBases';
    import { selectedBase } from '$lib/stores';

    let bases = [];

    onMount(async () => {
        bases = await fetchBases();
        console.log(bases);
    });

    function selectBase(baseId: string) {
        selectedBase.set(baseId);
    }
</script>

<div>
    <p>Selected Base ID: {$selectedBase}</p>
    <h1>Bases</h1>
    {#if bases.length > 0}
        <ul>
            {#each bases as base}
                <li on:click={() => selectBase(base.id)}>{base.name}</li>
            {/each}
        </ul>
    {:else}
        <p>Loading bases...</p>
    {/if}
</div>