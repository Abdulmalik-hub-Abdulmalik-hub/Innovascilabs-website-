hereimport { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Function don duba matsayin Admin.
 * Yana duba idan email din ya yi daidai da naka, 
 * ko kuma idan user din yana da matsayin 'admin' a database.
 */
export const checkAdminRole = async (user) => {
  if (!user) return false;
  
  // Naka email din yana da full access ko da yaushe
  if (user.email === 'abdulmalikmusba@gmail.com') return true;

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error) return false;
  return data?.role === 'admin' || data?.role === 'super-admin';
}
