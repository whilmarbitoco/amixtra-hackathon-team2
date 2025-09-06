import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,    // The '!' tells TypeScript it's defined
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// User profile interface matching user_information table
export interface UserProfile {
  user_id: string        // PK & FK to auth.users.id
  fullname: string | null
  phone: string | null
  role: 'business_owner' | 'driver'
  company: string | null
  business: string | null
  license: string | null
  created_at: string
}

