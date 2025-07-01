<script lang="ts">
  import Tesseract from 'tesseract.js';

  let file: File | null = null;
  let previewUrl: string | null = null;
  let ocrText = '';
  let loading = false;

  function handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input?.files?.length) {
      file = input.files[0];
      previewUrl = URL.createObjectURL(file);
      ocrText = '';
    }
  }

  async function runOCR() {
    if (!file) return;
    loading = true;
    ocrText = 'Processing...';

    try {
      const { data } = await Tesseract.recognize(file, 'eng');
      ocrText = data.text.trim();
    } catch (e) {
      ocrText = 'OCR failed. Try a clearer screenshot.';
    } finally {
      loading = false;
    }
  }

  function clearImage() {
    file = null;
    previewUrl = null;
    ocrText = '';
  }
</script>

<h2 class="text-xl font-bold mb-6">📊 TikTok Analytics Screenshot OCR</h2>

<p class="text-zinc-400 mb-4">
  Upload your analytics screenshot. We’ll extract text like views, likes, and retention.
</p>

<input type="file" accept="image/*" on:change={handleFileChange} class="mb-4 text-white" />

{#if previewUrl}
  <div class="relative mb-4">
    <img src={previewUrl} alt="Preview" class="rounded-lg max-w-xs border border-zinc-700" />
    <button on:click={clearImage} class="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
      ✕
    </button>
  </div>

  <button
    on:click={runOCR}
    class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold mb-4"
    disabled={loading}
  >
    {loading ? 'Extracting...' : 'Run OCR'}
  </button>

  <div class="bg-zinc-900 p-4 border border-zinc-700 rounded whitespace-pre-wrap text-sm text-zinc-300">
    {ocrText || 'No OCR output yet.'}
  </div>
{/if}
