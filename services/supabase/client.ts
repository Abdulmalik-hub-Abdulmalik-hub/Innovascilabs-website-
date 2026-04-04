// @ts-ignore
import { createBrowserClient } from '@supabase/ssr';
import { createClient as createBaseClient } from '@supabase/supabase-js';

/**
 * 1. This function is specific for Next.js Server-Side Rendering (SSR)
 * We renamed it to 'createBrowserSupabaseClient' to avoid the "Merged Declaration" error.
 */
export const createBrowserSupabaseClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

/**
 * 2. This is the 'Standard Client' for general use in your components.
 * We used 'createBaseClient' to distinguish it from the SSR function above.
 */
export const supabase = createBaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
