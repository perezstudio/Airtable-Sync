<script lang="ts">
    import { writable } from 'svelte/store';
    import { baseSchema, receivingSchema, differencesSchema } from '$lib/schemaStore';
    import { executeComparison } from '$lib/schemaDifference';
    import ChangeItem from '$lib/changeItem.svelte';

    async function handleCompareClick() {
      // Directly use the $ syntax to access the store values
      const differences = await executeComparison($baseSchema, $receivingSchema);
      differencesSchema.set(differences); // Store the results in the differencesSchema store
    }

</script>


<div class="w-full">
    <div class="flex flex-row justify-between">
      <button on:click={handleCompareClick} class="bg-slate-500 text-white rounded-lg px-4 py-2">Compare Schemas</button>
      <button class="bg-green-500 text-green-900 px-4 py-2 rounded-lg">Push All</button>
    </div>
    {#if $differencesSchema}
      {#if $differencesSchema.Create}
        <div class="flex flex-row justify-between items-center py-2">
          <h2 class="text-xl font-bold">Create</h2>
          <button class="bg-green-500 text-green-900 px-4 py-2 rounded-lg">Push Creations</button>
        </div>
        {#each $differencesSchema.Create as create}
          <ChangeItem id={create.id} name={create.name} type={create.type} />
        {/each}
      {/if}
      {#if $differencesSchema.Update}
        <div class="flex flex-row justify-between items-center py-2">
          <h2 class="text-xl font-bold">Update</h2>
          <button class="bg-green-500 text-green-900 px-4 py-2 rounded-lg">Push Updates</button>
        </div>
        {#each $differencesSchema.Update as update}
          <ChangeItem id={update.id} name={update.name} type={update.type} />
        {/each}
      {/if}
      {#if $differencesSchema.Delete}
        <div class="flex flex-row justify-between items-center py-2">
          <h2 class="text-xl font-bold">Delete</h2>
          <button class="bg-green-500 text-green-900 px-4 py-2 rounded-lg">Push Deletions</button>
        </div>
        {#each $differencesSchema.Delete as del}
          <ChangeItem id={del.id} name={del.name} type={del.type} />
        {/each}
      {/if}
      {#if $differencesSchema.CreateFormula}
        <div class="flex flex-row justify-between items-center py-2">
          <h2 class="text-xl font-bold">Create Formula Fields</h2>
          <button class="bg-green-500 text-green-900 px-4 py-2 rounded-lg">Push Updated Fields</button>
        </div>
        {#each $differencesSchema.CreateFormula as createFormula}
          <ChangeItem id={createFormula.id} name={createFormula.name} type={createFormula.type} />
        {/each}
      {/if}
      {#if $differencesSchema.UpdateFormula}
        <div class="flex flex-row justify-between items-center py-2">
          <h2 class="text-xl font-bold">Update Formula Fields</h2>
          <button class="bg-green-500 text-green-900 px-4 py-2 rounded-lg">Push Updated Fields</button>
        </div>
        {#each $differencesSchema.UpdateFormula as updateFormula}
          <ChangeItem id={updateFormula.id} name={updateFormula.name} type={updateFormula.type} />
        {/each}
      {/if}
      {#if $differencesSchema.CreateLinked}
        <div class="flex flex-row justify-between items-center py-2">
          <h2 class="text-xl font-bold">Create Formula Fields</h2>
          <button class="bg-green-500 text-green-900 px-4 py-2 rounded-lg">Push Linked Fields</button>
        </div>
        {#each $differencesSchema.CreateLinked as createLinked}
          <ChangeItem id={createLinked.id} name={createLinked.name} type={createLinked.type} />
        {/each}
      {/if}
      {#if $differencesSchema.UpdateLinked}
        <div class="flex flex-row justify-between items-center py-2">
          <h2 class="text-xl font-bold">Update Formula Fields</h2>
          <button class="bg-green-500 text-green-900 px-4 py-2 rounded-lg">Push Linked Fields</button>
        </div>
        {#each $differencesSchema.UpdateLinked as updateLinked}
          <ChangeItem id={updateLinked.id} name={updateLinked.name} type={updateLinked.type} />
        {/each}
      {/if}
    {/if}
    
</div>
