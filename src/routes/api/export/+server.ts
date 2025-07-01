import { supabaseServerClient } from '$lib/supabase-server';
import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
  const supabase = supabaseServerClient({ cookies } as any);
  const { data: sessionData } = await supabase.auth.getSession();

  const user_id = sessionData.session?.user.id;
  if (!user_id) return json({ error: 'Not logged in' }, { status: 401 });

  const { data: planner } = await supabase.from('planner').select('*').eq('user_id', user_id);
  const { data: analytics } = await supabase.from('analytics').select('*').eq('user_id', user_id);

  return json({
    exported_at: new Date().toISOString(),
    user: sessionData.session?.user?.email,
    planner,
    analytics
  });
}
