import { supabase } from './supabase'
import type { UserProfile } from './supabase'

export const getUserWithProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile } = await supabase
    .from('user_information')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!profile) return null

  return { ...user, ...profile }
}

export const checkUserRole = async (requiredRole: 'business_owner' | 'driver') => {
  const userWithProfile = await getUserWithProfile()
  
  if (!userWithProfile || userWithProfile.role !== requiredRole) {
    return false
  }
  
  return userWithProfile
}

export const setLegacyUserData = (user: any) => {
  // Set localStorage for backward compatibility with existing components
  localStorage.setItem("currentUser", JSON.stringify({
    id: user.id,
    name: user.fullname,
    email: user.email,
    role: user.role === "business_owner" ? "business" : "driver"
  }))
}