import { createServerClient } from '@supabase/auth-helpers-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';

export function supabaseServerClient(event: RequestEvent) {
  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL!,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, opts) => event.cookies.set(key, value, opts),
        remove: (key, opts) => event.cookies.delete(key, opts)
      }
    }
  );
}
