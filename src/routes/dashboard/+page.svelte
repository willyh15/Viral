<script lang="ts">
  export let data;
</script>

<h2 class="text-2xl font-bold mb-6">📊 Dashboard Summary</h2>

<div class="grid sm:grid-cols-2 gap-6 text-sm">
  <div class="bg-zinc-800 p-5 rounded border border-zinc-700">
    <h3 class="font-semibold text-zinc-300 mb-1">📅 Planner Entries</h3>
    <p class="text-white text-3xl">{data.plannerCount}</p>
    {#if data.lastPlanner}
      <p class="text-zinc-400 mt-1">Last plan: {data.lastPlanner}</p>
    {/if}
  </div>

  <div class="bg-zinc-800 p-5 rounded border border-zinc-700">
    <h3 class="font-semibold text-zinc-300 mb-1">📈 Analytics Entries</h3>
    <p class="text-white text-3xl">{data.analyticsCount}</p>
    {#if data.lastAnalytics}
      <p class="text-zinc-400 mt-1">Last post: {data.lastAnalytics}</p>
    {/if}
  </div>
</div>
