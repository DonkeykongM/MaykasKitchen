import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Using mock client for development.');
}

// Create a client even if variables are missing to prevent app from crashing
// In production, these values should always be set
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export const checkSupabaseConnection = async () => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Cannot check Supabase connection: Missing environment variables');
      return false;
    }
    
    // Use a more basic health check that's less likely to fail due to permissions
    const { error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase connection error:', error.message);
      return false;
    }
    
    console.log('Successfully connected to Supabase!');
    return true;
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return false;
  }
};