import { createClient } from '@supabase/supabase-js'

// Note: This client uses the SERVICE ROLE KEY, which bypasses all Row Level Security.
// ONLY use this in secure backend API routes, NEVER expose this to the client.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
