import { supabaseServerClient } from '$lib/supabase-server';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
  const supabase = supabaseServerClient(event);
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) throw redirect(302, '/login');

  const { data } = await supabase.from('planner').select('*').eq('user_id', session.user.id);

  return { entries: data || [] };
}

export const actions = {
  save: async ({ request, cookies }) => {
    const supabase = supabaseServerClient({ cookies } as any);
    const session = (await supabase.auth.getSession()).data.session;
    const data = JSON.parse((await request.formData()).get('updates') as string);

    // Overwrite user data
    await supabase.from('planner').delete().eq('user_id', session?.user.id);
    for (const entry of data) {
      await supabase.from('planner').insert({ ...entry, user_id: session?.user.id });
    }

    return { success: true };
  }
};
