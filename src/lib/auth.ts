import { supabase } from './supabase'
import type { UserProfile } from './supabase'

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    throw new Error(error.message)
  }

  // Get user profile data
  const { data: profile } = await supabase
    .from('user_information')
    .select('*')
    .eq('user_id', data.user.id)
    .single()

  return { ...data.user, ...profile }
}

export const signUp = async (userData: {
  fullname: string
  phone: string
  email: string
  password: string
  role: 'business_owner' | 'driver'
  company?: string
  business?: string
  license?: string
}) => {
  // Sign up with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password
  })

  if (error) {
    throw new Error(error.message)
  }

  if (!data.user) {
    throw new Error('Failed to create user')
  }

  // Insert user profile
  const { error: profileError } = await supabase
    .from('user_information')
    .insert({
      user_id: data.user.id,
      fullname: userData.fullname,
      phone: userData.phone,
      role: userData.role,
      company: userData.role === 'business_owner' ? userData.company : null,
      business: userData.role === 'business_owner' ? userData.business : null,
      license: userData.role === 'driver' ? userData.license : null
    })

  if (profileError) {
    throw new Error(profileError.message)
  }

  return data.user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile } = await supabase
    .from('user_information')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return { ...user, ...profile }
}