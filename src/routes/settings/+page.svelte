import { supabase } from '$lib/supabase';
import { onMount } from 'svelte';

let userEmail: string | null = null;

onMount(async () => {
  const { data } = await supabase.auth.getSession();
  userEmail = data.session?.user.email || null;
});

async function signOut() {
  await supabase.auth.signOut();
  location.href = '/login';
}
