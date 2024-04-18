<script lang="ts">
    import { writable } from 'svelte/store';
    import { baseSchema, receivingSchema, differencesSchema } from '$lib/schemaStore';
    import { executeComparison } from '$lib/schemaDifference';
    import ChangeItem from '$lib/changeItem.svelte';

    let groupedDifferences = writable({});

    // Enhanced function to find a table name by its ID, checking both schemas if necessary
    const findTableNameById = (tableId, baseSchema, receivingSchema) => {
      console.log("Looking for tableId:", tableId, "in both schemas");
      // Attempt to find in the base schema first
      let table = baseSchema.find(t => t.id === tableId);
      if (!table) {
        // If not found, attempt to find in the receiving schema
        table = receivingSchema.find(t => t.id === tableId);
      }
      console.log("Found table:", table);
      return table ? table.name : 'Unknown Table'; // Directly using "name" as the table name
    };
  
  $: if ($differencesSchema && $baseSchema && $receivingSchema) {
    let newGrouping = {};
    
    // Process for all actions
    ['Create', 'Update', 'Delete'].forEach(action => {
      $differencesSchema[action]?.forEach(change => {
        // Fetch table name from either baseSchema or receivingSchema as needed
        const tableName = findTableNameById(change.tableId, $baseSchema, $receivingSchema);
        if (!newGrouping[action]) newGrouping[action] = {};
        if (!newGrouping[action][tableName]) {
          newGrouping[action][tableName] = [];
        }
        newGrouping[action][tableName].push(change);
      });
    });

    groupedDifferences.set(newGrouping);
  }

  async function handleCompareClick() {
    const differences = await executeComparison($baseSchema, $receivingSchema);
    differencesSchema.set(differences); // Store the results in the differencesSchema store
  }

</script>


<div class="w-full">
    <div class="flex flex-row justify-between">
      <button on:click={handleCompareClick} class="bg-slate-500 text-white rounded-lg px-4 py-2">Compare Schemas</button>
      <button class="bg-green-500 text-green-900 px-4 py-2 rounded-lg">Push All</button>
    </div>
    {#if $groupedDifferences}
  {#each Object.keys($groupedDifferences) as action}
    <div class="mt-4">
      {#if action == 'Create'}
        <h1 class="text-3xl font-bold text-green-600">{action}</h1>
      {:else if action == 'Update'}
        <h1 class="text-3xl font-bold text-yellow-600">{action}</h1>
      {:else if action == 'Delete'}
        <h1 class="text-3xl font-bold text-red-600">{action}</h1>
      {/if}
      {#each Object.entries($groupedDifferences[action]) as [tableName, changes]}
        <div class="py-2">
          <h3 class="text-lg font-bold text-slate-600">{tableName}</h3>
          {#each changes as change}
            <ChangeItem id={change.id} name={change.name} type={change.type} />
          {/each}
        </div>
      {/each}
    </div>
  {/each}
{/if}

</div>
