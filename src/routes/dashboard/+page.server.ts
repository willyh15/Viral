import { supabaseServerClient } from '$lib/supabase-server';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
  const supabase = supabaseServerClient(event);
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) throw redirect(302, '/login');

  const uid = session.user.id;

  const { count: plannerCount } = await supabase
    .from('planner')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', uid);

  const { count: analyticsCount } = await supabase
    .from('analytics')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', uid);

  const { data: recentPlanner } = await supabase
    .from('planner')
    .select('date')
    .eq('user_id', uid)
    .order('date', { ascending: false })
    .limit(1);

  const { data: recentAnalytics } = await supabase
    .from('analytics')
    .select('label')
    .eq('user_id', uid)
    .order('id', { ascending: false })
    .limit(1);

  return {
    plannerCount: plannerCount || 0,
    analyticsCount: analyticsCount || 0,
    lastPlanner: recentPlanner?.[0]?.date || null,
    lastAnalytics: recentAnalytics?.[0]?.label || null
  };
}
