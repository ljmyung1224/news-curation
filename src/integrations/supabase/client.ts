import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Publishable (anon) credentials — safe to ship in client code.
const FALLBACK_URL = "https://ggooxrwxjiwxiyqfxpro.supabase.co";
const FALLBACK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdnb294cnd4aml3eGl5cWZ4cHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMjY5ODAsImV4cCI6MjEwMDcwMjk4MH0.kQI_i5u4xLxGMqDYP3cg3UuS-I8OHa942mktyGDi9Zc";

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || FALLBACK_URL;
const anonKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) || FALLBACK_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
