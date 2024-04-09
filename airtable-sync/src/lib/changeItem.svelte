<script lang="ts">
    export let name: string;
    export let type: string;
    export let id: string;
</script>

<div class="flex flex-row justify-between">
    <h3>{name}</h3>
    <p>{type}</p>
</div>