"use client";

import { useState } from "react";
import { 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign, 
  Navigation,
  Bot,
  Send
} from "lucide-react";
import { driverRoutes, driverAnalytics } from "@/constants";

export default function DriverDashboard() {
  const [chatMessages, setChatMessages] = useState<{id: string, text: string, isBot: boolean}[]>([
    {id: '1', text: 'Hello! I\'m your driving assistant. How can I help you today?', isBot: true}
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
            { role: 'system', content: 'You are a helpful driving assistant. Provide concise advice about driving, traffic rules, vehicle maintenance, and road safety.' },
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

  return (
    <>
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Trips</p>
              <p className="text-3xl font-bold text-blue-600">{driverAnalytics.totalTrips}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Distance</p>
              <p className="text-3xl font-bold text-green-600">{driverAnalytics.totalDistance} km</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Earnings</p>
              <p className="text-3xl font-bold text-yellow-600">₱{driverAnalytics.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Routes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Routes</h2>
            <div className="space-y-4">
              {driverRoutes.map((route) => (
                <div key={route.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">{route.from} → {route.to}</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {route.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Navigation className="h-4 w-4" />
                      {route.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {route.duration}
                    </div>
                    <div>{route.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Chatbot */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 h-[500px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">AI Assistant</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {chatMessages.map((msg) => (
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
            
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about driving..."
                disabled={loading}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
      </div>
    </>
  );
}