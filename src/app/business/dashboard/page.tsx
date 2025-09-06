"use client";

import { useEffect, useState } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Truck, 
  Calendar, 
  BarChart3,
  PieChart,
  Activity,
  Bot,
  Send
} from "lucide-react";
import { businessAnalytics, vehicles } from "@/constants";

export default function BusinessDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<{id: string, text: string, isBot: boolean}[]>([
    {id: '1', text: 'Hello! I\'m your business AI assistant. How can I help you manage your fleet today?', isBot: true}
  ]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(storedBookings);
  }, []);

  const recentBookings = bookings.slice(-5);

  return (
    <>
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

        {/* AI Chatbot & Performance */}
        <div className="space-y-8">
          {/* AI Chatbot */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-[400px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-6 w-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-900">AI Assistant</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.isBot 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    if (inputMessage.trim()) {
                      setChatMessages(prev => [
                        ...prev,
                        {id: Date.now().toString(), text: inputMessage, isBot: false},
                        {id: (Date.now() + 1).toString(), text: 'I can help you with fleet management, analytics, and business insights!', isBot: true}
                      ]);
                      setInputMessage('');
                    }
                  }
                }}
                placeholder="Ask about your business..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => {
                  if (inputMessage.trim()) {
                    setChatMessages(prev => [
                      ...prev,
                      {id: Date.now().toString(), text: inputMessage, isBot: false},
                      {id: (Date.now() + 1).toString(), text: 'I can help you with fleet management, analytics, and business insights!', isBot: true}
                    ]);
                    setInputMessage('');
                  }
                }}
                className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Performance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium">Revenue Growth</span>
                </div>
                <span className="text-emerald-600 font-bold">+{businessAnalytics.monthlyGrowth}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Completed Trips</span>
                </div>
                <span className="text-blue-600 font-bold">{businessAnalytics.completedTrips}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Fleet Utilization</span>
                </div>
                <span className="text-purple-600 font-bold">78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}