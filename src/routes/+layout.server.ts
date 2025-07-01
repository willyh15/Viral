import { supabase } from '$lib/supabase-server'; // we’ll stub this server helper

export async function load({ cookies }) {
  const access_token = cookies.get('sb-access-token');
  const refresh_token = cookies.get('sb-refresh-token');

  if (!access_token || !refresh_token) return { session: null };

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token
  });

  return {
    session: data.session
  };
}
