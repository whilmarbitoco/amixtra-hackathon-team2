'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, Truck, Calendar, UserCheck, BarChart3, FileText, Settings, LogOut
} from 'lucide-react';

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(currentUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  const navItems = [
    { href: "/business/dashboard", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
    { href: "#", icon: <Truck className="h-5 w-5" />, label: "Fleet Management" },
    { href: "#", icon: <Calendar className="h-5 w-5" />, label: "Bookings" },
    { href: "#", icon: <UserCheck className="h-5 w-5" />, label: "Drivers" },
    { href: "#", icon: <BarChart3 className="h-5 w-5" />, label: "Analytics" },
    { href: "#", icon: <FileText className="h-5 w-5" />, label: "Reports" },
    { href: "#", icon: <Settings className="h-5 w-5" />, label: "Settings" },
  ];

  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">Business Panel</h2>
        </div>
        <nav className="mt-6">
          {navItems.map((item, index) => (
            <a 
              key={index}
              href={item.href} 
              className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50"
            >
              {item.icon}
              {item.label}
            </a>
          ))}
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
            <h1 className="text-2xl font-bold text-gray-900">Business Portal</h1>
            <span className="text-gray-600">Welcome, {user?.name}</span>
          </div>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}