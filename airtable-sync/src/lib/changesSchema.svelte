<script lang="ts">
    import { writable } from 'svelte/store';
    import { baseSchema, receivingSchema, differencesSchema } from '$lib/schemaStore';
    import { executeComparison } from '$lib/schemaDifference';

    async function handleCompareClick() {
      // Directly use the $ syntax to access the store values
      const differences = await executeComparison($baseSchema, $receivingSchema);
      differencesSchema.set(differences); // Store the results in the differencesSchema store
    }
</script>


<div class="w-full">
    <button on:click={handleCompareClick}>Compare Schemas</button>
    <h2>Create</h2>
    <p>{differencesSchema}</p>
</div>
