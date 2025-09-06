"use client";

import { useState } from "react";
import React from "react";
import { 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign, 
  Navigation,
  Bot,
  Send,
  Route,
  Zap,
  ArrowRight,
  Minus,
  MessageCircle
} from "lucide-react";
import { driverRoutes, driverAnalytics } from "@/constants";
import { useRouter } from "next/navigation";

export default function DriverDashboard() {
  const router = useRouter();
  const [chatMessages, setChatMessages] = useState<{id: string, text: string, isBot: boolean}[]>([
    {id: '1', text: 'Hello! I\'m your driving assistant. How can I help you today?', isBot: true}
  ]);
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

      {/* Route Planner CTA */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Route className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Plan Your Next Route</h3>
                <p className="text-blue-100 mb-4">AI-powered route optimization for maximum efficiency</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    <span>Smart Navigation</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Real-time Traffic</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>Cost Optimization</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/v1/route')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 group"
            >
              Start Planning
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Routes - Full Width */}
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
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
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
                placeholder="Ask me anything..."
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
