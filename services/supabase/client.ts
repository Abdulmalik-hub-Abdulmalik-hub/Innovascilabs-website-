// @ts-expect-error - Ignore module resolution during build
import { createBrowserClient } from '@supabase/ssr';
import { createClient as createBaseClient } from '@supabase/supabase-js';

/**
 * 1. This function is specific for Next.js Server-Side Rendering (SSR)
 */
export const createBrowserSupabaseClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

/**
 * 2. Standard Client for general use
 */
export const supabase = createBaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
