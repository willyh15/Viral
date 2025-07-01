<script lang="ts">
  import { supabase } from '$lib/supabase';

  let email = '';
  let password = '';
  let error = '';

  async function login() {
    const { error: e } = await supabase.auth.signInWithPassword({ email, password });
    error = e?.message || '';
    if (!e) location.href = '/dashboard';
  }

  async function signup() {
    const { error: e } = await supabase.auth.signUp({ email, password });
    error = e?.message || '';
    if (!e) location.href = '/dashboard';
  }
</script>

<h2 class="text-xl font-bold mb-4">🔐 Log in</h2>

<div class="flex flex-col gap-4 max-w-sm">
  <input bind:value={email} type="email" placeholder="Email" class="p-2 rounded bg-zinc-800 text-white" />
  <input bind:value={password} type="password" placeholder="Password" class="p-2 rounded bg-zinc-800 text-white" />
  {#if error}<p class="text-red-400 text-sm">{error}</p>{/if}
  <div class="flex gap-2">
    <button on:click={login} class="bg-blue-600 px-4 py-2 text-white rounded">Login</button>
    <button on:click={signup} class="bg-green-600 px-4 py-2 text-white rounded">Sign Up</button>
  </div>
</div>
