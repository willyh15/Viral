<script lang="ts">
  import { generateHook } from '$lib/api/openrouter';
  import { downloadText, downloadJSON } from '$lib/utils/export';

  let prompt = '';
  let result = '';
  let loading = false;

  async function getHooks() {
    if (!prompt) return;
    loading = true;
    result = '';
    try {
      result = await generateHook(prompt);
    } catch {
      result = 'Error generating hook.';
    } finally {
      loading = false;
    }
  }

  function exportHooks() {
    const filename = `hooks-${Date.now()}.txt`;
    downloadText(filename, result);
  }

  function exportHooksJSON() {
    const filename = `hooks-${Date.now()}.json`;
    downloadJSON(filename, { prompt, hooks: result });
  }
</script>

<!-- inside existing {#if result} block -->
<div class="flex gap-3 mt-3">
  <button on:click={exportHooks} class="bg-zinc-700 px-3 py-2 rounded text-sm">⬇️ .txt</button>
  <button on:click={exportHooksJSON} class="bg-zinc-700 px-3 py-2 rounded text-sm">⬇️ .json</button>
</div>
