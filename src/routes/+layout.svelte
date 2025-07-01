<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  export let data;
  let session = data.session;

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session;
    });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      session = newSession;
    });
  });
</script>

<main class="min-h-screen bg-zinc-900 text-white font-sans">
  <slot />
</main>
