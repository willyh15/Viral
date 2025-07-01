<script lang="ts">
  import { generateCaption } from '$lib/api/openrouter';
  import { downloadText, downloadJSON } from '$lib/utils/export';

  let topic = '';
  let tone = 'default';
  let result = '';
  let loading = false;

  async function getCaption() {
    if (!topic) return;
    loading = true;
    result = '';
    try {
      result = await generateCaption(topic, tone);
    } catch {
      result = 'Error generating caption.';
    } finally {
      loading = false;
    }
  }

  function exportCaption() {
    const filename = `caption-${Date.now()}.txt`;
    downloadText(filename, result);
  }

  function exportCaptionJSON() {
    const filename = `caption-${Date.now()}.json`;
    downloadJSON(filename, { topic, tone, caption: result });
  }
</script>

<!-- inside existing {#if result} block -->
<div class="flex gap-3 mt-3">
  <button on:click={exportCaption} class="bg-zinc-700 px-3 py-2 rounded text-sm">⬇️ .txt</button>
  <button on:click={exportCaptionJSON} class="bg-zinc-700 px-3 py-2 rounded text-sm">⬇️ .json</button>
</div>
