'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, Route, Truck, FileText, Fuel, User, Settings, LogOut
} from 'lucide-react';
import Link from 'next/link';
import { checkUserRole, setLegacyUserData } from '@/lib/auth-helpers';
import { signOut } from '@/lib/auth';

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userWithProfile = await checkUserRole('driver')
        
        if (!userWithProfile) {
          router.push("/login")
          return
        }
        
        setUser(userWithProfile)
        setLegacyUserData(userWithProfile)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push("/login")
      }
    }
    
    checkUser()
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut()
      localStorage.removeItem("currentUser")
      router.push("/")
    } catch (error) {
      console.error('Logout failed:', error)
      localStorage.removeItem("currentUser")
      router.push("/")
    }
  };

  const navItems = [
    { href: "/driver/dashboard", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
    { href: "/driver/commodities", icon: <FileText className="h-5 w-5" />, label: "Browse Commodities" },
    { href: "/driver/vehicles", icon: <Truck className="h-5 w-5" />, label: "My Vehicles" },
    { href: "/driver/history", icon: <Route className="h-5 w-5" />, label: "Trip History" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex">
      <div className="w-64 bg-white shadow-lg">
       <Link href="/">
          <div className="p-6 flex items-center justify-center">
            <img src="/gb-logo.png" alt="Logo" className="w-6/12" />
        </div>
       </Link>
        <nav className="mt-6">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={index}
                href={item.href} 
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  isActive 
                    ? 'bg-emerald-100 text-emerald-700 border-r-2 border-emerald-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50 w-full text-left"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </nav>
      </div>

      <div className="flex-1">
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Driver Portal</h1>
            <span className="text-gray-600">Welcome, {user?.fullname || user?.name}</span>
          </div>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}