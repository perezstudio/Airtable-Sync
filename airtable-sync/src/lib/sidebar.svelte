<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchBases } from './fetchBases';
    import { selectedBase } from '$lib/selectedBaseStore';

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
    <h1 class="px-4">Bases</h1>
    {#if bases.length > 0}
        <ul>
            {#each bases as base}
                <li on:click={() => selectBase(base.id)} class="w-full py-2 px-4 flex flex-row justify-between gap-2">
                    <p>{base.name}</p>
                    {#if base.id == $selectedBase}
                        <p>Selected</p>
                    {/if}
                </li>
            {/each}
        </ul>
    {:else}
        <p>Loading bases...</p>
    {/if}
</div>