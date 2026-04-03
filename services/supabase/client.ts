import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase Client for Client Components
 * This client is safe to use in 'use client' files.
 * It handles browser-based authentication and real-time subscriptions.
 */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
