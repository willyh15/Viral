<script lang="ts">
  export let data;
  import { formatDate } from '$lib/utils/helpers';
  import { enhance } from '$app/forms';

  let plan = data.entries.length
    ? data.entries
    : Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
          date: d.toISOString().split('T')[0],
          idea: ''
        };
      });

  let saving = false;
</script>

<h2 class="text-xl font-bold mb-6">🗓 Weekly Planner (Saved)</h2>

<form method="POST" use:enhance>
  <input type="hidden" name="updates" value={JSON.stringify(plan)} />

  <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
    {#each plan as day, i}
      <div class="bg-zinc-800 p-4 rounded-xl border border-zinc-700">
        <h3 class="font-semibold text-sm text-zinc-400 mb-2">{formatDate(new Date(day.date))}</h3>
        <textarea
          class="w-full p-2 rounded bg-zinc-900 text-white"
          placeholder="Video idea..."
          bind:value={plan[i].idea}
          rows="4"
        />
      </div>
    {/each}
  </div>

  <button
    type="submit"
    class="bg-blue-600 hover:bg-blue-700 transition p-3 rounded-md text-white font-semibold mt-6"
    on:click={() => (saving = true)}
    disabled={saving}
  >
    {saving ? 'Saving...' : 'Save Plan'}
  </button>
</form>
