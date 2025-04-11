import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

// Get Supabase URL and anon key from environment variables or use placeholders
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
export const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' && 
  supabaseAnonKey !== 'your-supabase-anon-key';

// Create a supabase client only if properly configured
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://example.supabase.co', 'dummy-key'); // Dummy client that won't make real connections

// Function to subscribe to real-time changes
export const subscribeToChanges = (table, callback) => {
  // If Supabase is not configured, return a mock subscription object
  if (!isSupabaseConfigured) {
    console.warn(`Skipping real-time subscription for ${table} - Supabase not configured`);
    return {
      unsubscribe: () => console.log(`Mock unsubscribe from ${table}`)
    };
  }
  
  // Only attempt WebSocket connection if properly configured
  try {
    return supabase
      .channel(`public:${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
        callback(payload);
        
        // Show notifications for different events
        if (payload.eventType === 'INSERT') {
          toast.success('New item added!');
        } else if (payload.eventType === 'UPDATE') {
          toast.info('Item updated');
        } else if (payload.eventType === 'DELETE') {
          toast.error('Item removed');
        }
      })
      .subscribe();
  } catch (error) {
    console.error(`Error subscribing to ${table}:`, error);
    return {
      unsubscribe: () => console.log(`Mock unsubscribe from ${table} after error`)
    };
  }
};

// Helper function to handle errors with toast notifications
export const handleSupabaseError = (error) => {
  console.error('Supabase error:', error);
  toast.error(error.message || 'An error occurred');
  return error;
}; 