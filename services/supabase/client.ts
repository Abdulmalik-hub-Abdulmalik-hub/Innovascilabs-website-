// services/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client for Client Components (browser)
 * Only use anon key here; never expose service role key
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
