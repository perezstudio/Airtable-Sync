<script lang="ts">
    import { writable } from 'svelte/store';
    import { baseSchema, receivingSchema } from '$lib/schemaStore';
    import { compareSchemas } from '$lib/schemaDifference';

    let actions = writable({ createTables: [], updateTables: [], deleteTables: [] });

    async function updateActions() {
        if ($baseSchema && $receivingSchema) {
            const result = await compareSchemas($baseSchema, $receivingSchema);
            actions.set(result);
        }
    }

    // Reactive trigger for schema changes
    $: $baseSchema, $receivingSchema, updateActions();
</script>


<div class="w-full">
    <h2>Create</h2>
    {#each $actions.createTables as { id, name, type, options }}
      <div>
        <h3>{name} (Table)</h3>
        {#if options.fields && options.fields.length}
          <ul>
            {#each options.fields as field}
              <li>{field.name} ({field.type})</li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
    <h2>Update</h2>
    {#each $actions.updateTables as { id, name, type, options }}
      <div>
        <h3>{name} (Table)</h3>
        {#if options.fields && options.fields.length}
          <ul>
            {#each options.fields as field}
              <li>{field.name} ({field.type})</li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
    <h2>Delete</h2>
    {#each $actions.deleteTables as { id, name, type, options }}
      <div>
        <h3>{name} (Table)</h3>
        {#if options.fields && options.fields.length}
          <ul>
            {#each options.fields as field}
              <li>{field.name} ({field.type})</li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
</div>
