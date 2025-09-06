"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Truck, 
  Calendar, 
  Bot,
  Send,
  MessageCircle,
  Minus
} from "lucide-react";
import { useRouter } from "next/navigation";
import { businessAnalytics, sampleBookings, chatMessages } from "@/constants";

export default function BusinessDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [chatMessagesState, setChatMessages] = useState<{id: string, text: string, isBot: boolean}[]>(chatMessages.business);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

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
            ...chatMessagesState.map(msg => ({ role: msg.isBot ? 'assistant' : 'user', content: msg.text })),
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
              <p className="text-3xl font-bold text-green-600">{bookings.length}</p>
              <p className="text-sm text-green-600 mt-1">All time</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Available Drivers</p>
              <p className="text-3xl font-bold text-yellow-600">{businessAnalytics.activeVehicles}</p>
              <p className="text-sm text-yellow-600 mt-1">Ready to ship</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

 {/* Commodities Tracker CTA */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Track Your Commodities</h3>
                <p className="text-blue-100 mb-4">Real-time tracking and monitoring of all shipments</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Live Updates</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>GPS Tracking</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bot className="h-4 w-4" />
                    <span>Route Optimization</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/v1/track')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 group"
            >
              Start Tracking
              <Truck className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Shipments - Full Width */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Shipments</h2>
        </div>
            
            {recentBookings.length > 0 ? (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/business/shipments?shipmentId=${booking.id}`)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">Shipment to {booking.distributorName}</h3>
                        <p className="text-sm text-gray-600">{booking.distributorEmail}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
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
              </div>
            )}
      </div>

      {/* AI Performance Summary */}
      {bookings.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">AI Performance Analysis</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">Data Optimized</span>
              </div>
              <div className="text-xs text-gray-500">Last 30 days</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-lg font-semibold text-gray-900">{Math.round((bookings.filter(b => b.status === 'Confirmed').length / bookings.length) * 100)}%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Capacity Moved</p>
                <p className="text-lg font-semibold text-gray-900">{bookings.reduce((sum, b) => sum + (parseInt(b.capacity.split(' ')[0]) || 0), 0)} tons</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Weekly Average</p>
                <p className="text-lg font-semibold text-gray-900">{Math.round(bookings.length / 30 * 7)} shipments</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-6">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Key Insights:</span>
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  {bookings.filter(b => b.status === 'Confirmed').length} Completed
                </span>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                  {businessAnalytics.totalBookings} Active
                </span>
              </div>
              
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-600">AI Confidence:</span>
                <span className="text-sm font-medium text-gray-900">94%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Chatbot */}
      {isMinimized ? (
        <div 
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-2xl border border-gray-200 z-50 cursor-pointer hover:bg-blue-700 transition-colors flex items-center justify-center"
          onClick={() => setIsMinimized(false)}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </div>
      ) : (
        <div 
          className="fixed bottom-6 right-6 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 select-none"
        >
          <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Shipping Assistant</h3>
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <Minus className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 space-y-2">
            {chatMessagesState.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  msg.isBot 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'bg-blue-600 text-white'
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
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
                placeholder="Ask about your business..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !inputMessage.trim()}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
