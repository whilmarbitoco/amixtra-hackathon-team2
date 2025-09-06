"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Truck, 
  Calendar, 
  Bot,
  Send
} from "lucide-react";
import { businessAnalytics } from "@/constants";

export default function BusinessDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<{id: string, text: string, isBot: boolean}[]>([
    {id: '1', text: 'Hello! I\'m your shipping assistant. I can help you find drivers, track shipments, and manage your logistics.', isBot: true}
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage = {id: Date.now().toString(), text: inputMessage, isBot: false};
    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful business assistant for fleet management. Provide concise advice about logistics, fleet operations, business analytics, and transportation management.' },
            ...chatMessages.map(msg => ({ role: msg.isBot ? 'assistant' : 'user', content: msg.text })),
            { role: 'user', content: inputMessage }
          ]
        })
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t process that request.';
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), 
        text: content, 
        isBot: true
      }]);
    } catch (error) {
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), 
        text: 'Sorry, I encountered an error. Please try again.', 
        isBot: true
      }]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    // Add sample data if no bookings exist
    if (storedBookings.length === 0) {
      const sampleBookings = [
        {
          id: '1',
          distributorName: 'ABC Distribution',
          distributorEmail: 'contact@abc.com',
          status: 'Confirmed',
          vehicleType: 'Truck Driver',
          capacity: '10 tons',
          bookingDate: new Date().toISOString()
        },
        {
          id: '2',
          distributorName: 'XYZ Logistics',
          distributorEmail: 'info@xyz.com',
          status: 'Pending',
          vehicleType: 'Van Driver',
          capacity: '5 tons',
          bookingDate: new Date().toISOString()
        }
      ];
      setBookings(sampleBookings);
    } else {
      setBookings(storedBookings);
    }
  }, []);

  const recentBookings = bookings.slice(-5);

  return (
    <>
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Shipments</p>
              <p className="text-3xl font-bold text-blue-600">{businessAnalytics.totalBookings}</p>
              <p className="text-sm text-blue-600 mt-1">Goods in transit</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Shipments</p>
              <p className="text-3xl font-bold text-emerald-600">{bookings.length}</p>
              <p className="text-sm text-emerald-600 mt-1">All time</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <Truck className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Available Drivers</p>
              <p className="text-3xl font-bold text-orange-600">{businessAnalytics.activeVehicles}</p>
              <p className="text-sm text-orange-600 mt-1">Ready to ship</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Shipments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Shipments</h2>
              <button className="text-emerald-600 hover:text-emerald-700 font-medium">Create New</button>
            </div>
            
            {recentBookings.length > 0 ? (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">Shipment to {booking.distributorName}</h3>
                        <p className="text-sm text-gray-600">{booking.distributorEmail}</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Driver: {booking.vehicleType}</span>
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
                <Truck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No recent shipments</p>
                <button className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm">
                  Create First Shipment
                </button>
              </div>
            )}
          </div>
          
          {/* AI Performance Summary */}
          {bookings.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <div className="flex items-center gap-2 mb-6">
                <Bot className="h-5 w-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-gray-900">AI Performance Summary</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600">{Math.round((bookings.filter(b => b.status === 'Confirmed').length / bookings.length) * 100)}%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{bookings.reduce((sum, b) => sum + (parseInt(b.capacity.split(' ')[0]) || 0), 0)}</p>
                  <p className="text-sm text-gray-600">Total Tons</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">{Math.round(bookings.length / 30 * 7)}</p>
                  <p className="text-sm text-gray-600">Avg/Week</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-3">
                <p className="text-sm text-gray-700 text-center">
                  <span className="font-semibold">AI Insight:</span> Strong performance with {Math.round((bookings.filter(b => b.status === 'Confirmed').length / bookings.length) * 100)}% delivery success across {new Set(bookings.map(b => b.distributorName)).size} partners
                </p>
              </div>
            </div>
          )}
        </div>

        {/* AI Chatbot */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 h-[500px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-6 w-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-900">Shipping Assistant</h2>
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
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
                    Thinking...
                  </div>
                </div>
              )}
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
                        {id: (Date.now() + 1).toString(), text: 'I can help you find available drivers, create shipments, and track your goods!', isBot: true}
                      ]);
                      setInputMessage('');
                    }
                  }
                }}
                placeholder="Ask about shipping, drivers, or logistics..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => {
                  if (inputMessage.trim()) {
                    setChatMessages(prev => [
                      ...prev,
                      {id: Date.now().toString(), text: inputMessage, isBot: false},
                      {id: (Date.now() + 1).toString(), text: 'I can help you find available drivers, create shipments, and track your goods!', isBot: true}
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
        </div>
      </div>
    </>
  );
}
