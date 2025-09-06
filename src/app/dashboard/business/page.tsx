"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Navigation,
  MapPin, 
  Clock, 
  Fuel, 
  CheckCircle,
  MessageSquare,
  MessageCircle,
  Route,
  User,
  Send,
  DollarSign, 
  TrendingUp, 
  Users, 
  Truck, 
  Calendar, 
  Star,
  Plus,
  Eye,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Home,
  FileText,
  UserCheck,
  LogOut
} from "lucide-react";
import { businessAnalytics, vehicles } from "@/constants";

export default function BusinessDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  
  // New state for enhanced features
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [routeHistory, setRouteHistory] = useState<RouteHistory[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [currentRoute, setCurrentRoute] = useState('');

  const startInputRef = useRef<HTMLDivElement>(null);
  const finishInputRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(currentUser));
      const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      setBookings(storedBookings);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleStartInputChange = (value: string) => {
    setStart(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (value.length >= 2) {
      searchTimeoutRef.current = setTimeout(async () => {
        const suggestions = await searchLocations(value);
        setStartSuggestions(suggestions);
        setShowStartSuggestions(true);
      }, 300);
    } else {
      setShowStartSuggestions(false);
    }
  };

  const handleFinishInputChange = (value: string) => {
    setFinish(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (value.length >= 2) {
      searchTimeoutRef.current = setTimeout(async () => {
        const suggestions = await searchLocations(value);
        setFinishSuggestions(suggestions);
        setShowFinishSuggestions(true);
      }, 300);
    } else {
      setShowFinishSuggestions(false);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !socket || !currentRoute) return;
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      user: 'Driver',
      message: newMessage,
      timestamp: new Date(),
      type: 'message'
    };
    
    socket.emit('sendMessage', { route: currentRoute, message });
    setNewMessage('');
  };

  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>
  );

  const recentBookings = bookings.slice(-5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">Business Panel</h2>
        </div>
        <nav className="mt-6">
          <a href="#" className="flex items-center gap-3 px-6 py-3 text-emerald-600 bg-emerald-50 border-r-2 border-emerald-600">
            <Home className="h-5 w-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Truck className="h-5 w-5" />
            Fleet Management
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Calendar className="h-5 w-5" />
            Bookings
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50">
            <UserCheck className="h-5 w-5" />
            Drivers
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50">
            <BarChart3 className="h-5 w-5" />
            Analytics
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50">
            <FileText className="h-5 w-5" />
            Reports
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Settings className="h-5 w-5" />
            Settings
          </a>
          <button onClick={handleLogout} className="flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50 w-full text-left">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <span className="text-gray-600">Welcome, {user.name}</span>
          </div>
        </div>

        <div className="p-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-emerald-600">₱{businessAnalytics.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-emerald-600 mt-1">+{businessAnalytics.monthlyGrowth}% this month</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-blue-600">{businessAnalytics.totalBookings}</p>
                <p className="text-sm text-blue-600 mt-1">Active bookings</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Vehicles</p>
                <p className="text-3xl font-bold text-orange-600">{businessAnalytics.activeVehicles}</p>
                <p className="text-sm text-orange-600 mt-1">Fleet size</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
              </div>
              
              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.distributorName}</h3>
                          <p className="text-sm text-gray-600">{booking.distributorEmail}</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{booking.vehicleType} Vehicle</span>
                        <span>•</span>
                        <span>{booking.capacity}</span>
                        <span>•</span>
                        <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent bookings</p>
                </div>
              )}
            </div>

            {/* Fleet Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Fleet Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {vehicles.filter(v => v.status === "Available").length}
                  </div>
                  <div className="text-sm text-green-700">Available</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {vehicles.filter(v => v.status === "In Transit").length}
                  </div>
                  <div className="text-sm text-yellow-700">In Transit</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {vehicles.filter(v => v.status === "Loading").length}
                  </div>
                  <div className="text-sm text-blue-700">Loading</div>
                </div>
              </div>
            </div>
          </div>

          {/* OpenAI Chat */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  GreenBridge AI Assistant
                </h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`p-3 rounded-lg ${
                    msg.type === 'alert' ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm text-gray-900">{msg.user}</span>
                      <span className="text-xs text-gray-500">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{msg.message}</p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              
                  <div className="flex gap-2 m-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Share route info..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={sendMessage}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
