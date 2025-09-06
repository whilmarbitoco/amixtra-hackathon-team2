'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { io, Socket } from 'socket.io-client';
import { Package, Clock, MessageCircle, Send, Users, MapPin, Truck, CheckCircle, X } from 'lucide-react';
import { mockCommodities, mockTrackingMessages, type Commodity, type TrackingMessage } from '@/constants';

const TrackingMapComponent = dynamic(() => import('./TrackingMapComponent'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
});

interface UserLocation {
  lat: number;
  lng: number;
  accuracy: number;
}

export default function TrackPage() {
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [selectedCommodity, setSelectedCommodity] = useState<Commodity | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [trackingMessages, setTrackingMessages] = useState<TrackingMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const itemsPerPage = 3;
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize location tracking and socket connection
  useEffect(() => {
    // Simulate real-time driver location updates
    const updateDriverLocations = () => {
      setCommodities(prev => prev.map(commodity => {
        if (commodity.status === 'in-transit') {
          // Simulate slight movement towards destination
          const latDiff = (commodity.destination.lat - commodity.currentLocation.lat) * 0.01;
          const lngDiff = (commodity.destination.lng - commodity.currentLocation.lng) * 0.01;
          return {
            ...commodity,
            currentLocation: {
              lat: commodity.currentLocation.lat + latDiff,
              lng: commodity.currentLocation.lng + lngDiff
            },
            lastUpdate: new Date()
          };
        }
        return commodity;
      }));
    };
    
    const locationInterval = setInterval(updateDriverLocations, 30000); // Update every 30 seconds

    // Load mock data
    setCommodities(mockCommodities);
    setSelectedCommodity(mockCommodities[0]);
    setTrackingMessages(mockTrackingMessages);
    setConnectedUsers(Math.floor(Math.random() * 10) + 5);

    // Initialize socket connection
    const newSocket = io('http://localhost:8080');
    
    newSocket.on('connect', () => {
      console.log('Connected to tracking server');
    });
    
    newSocket.on('trackingMessage', (message: TrackingMessage) => {
      setTrackingMessages(prev => [...prev, message]);
    });
    
    newSocket.on('userCount', (count: number) => {
      setConnectedUsers(count);
    });
    
    setSocket(newSocket);
    
    return () => {
      newSocket.disconnect();
      clearInterval(locationInterval);
    };
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [trackingMessages]);

  // Filter tracking messages based on selected commodity
  const filteredTrackingMessages = selectedCommodity 
    ? trackingMessages.filter(msg => 
        msg.message.includes(selectedCommodity.name) || 
        msg.message.includes(selectedCommodity.id) ||
        msg.type === 'status'
      )
    : [];

  const sendMessage = () => {
    if (!newMessage.trim() || !socket || !selectedCommodity) return;
    
    const message: TrackingMessage = {
      id: Date.now().toString(),
      user: 'Business',
      message: newMessage,
      timestamp: new Date(),
      type: 'message'
    };
    
    socket?.emit('sendTrackingMessage', { commodityId: selectedCommodity.id, message });
    setNewMessage('');
  };

  const sendStatusUpdate = (status: string) => {
    if (!socket || !selectedCommodity) return;
    
    const statusMessage: TrackingMessage = {
      id: Date.now().toString(),
      user: 'System',
      message: `📦 ${status} update for ${selectedCommodity.name}`,
      timestamp: new Date(),
      type: 'status'
    };
    
    socket?.emit('sendTrackingMessage', { commodityId: selectedCommodity.id, message: statusMessage });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-transit': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'delayed': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-black py-6 px-4 mb-2">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Commodity Tracker</h1>
          <p className="text-black/90">Monitor your shipments and commodities in real-time</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Commodities List & Current Location */}
          <div className="lg:col-span-1 space-y-6">
            {/* Driver Location */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                Driver Location
              </h3>
              {selectedCommodity ? (
                <div className="text-sm text-gray-600">
                  <p>Driver: {selectedCommodity.driver}</p>
                  <p>Lat: {selectedCommodity.currentLocation.lat.toFixed(6)}</p>
                  <p>Lng: {selectedCommodity.currentLocation.lng.toFixed(6)}</p>
                  <p className="text-xs mt-1">Last Update: {selectedCommodity.lastUpdate.toLocaleTimeString()}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Select a shipment to view driver location</p>
              )}
            </div>

            {/* Commodities List */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                Active Shipments
              </h3>
              {commodities.length > 0 ? (
                <>
                  <div className="space-y-3">
                    {commodities
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((commodity) => (
                      <div 
                        key={commodity.id} 
                        className={`border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer ${
                          selectedCommodity?.id === commodity.id ? 'bg-blue-50 border-blue-300' : ''
                        }`}
                        onClick={() => setSelectedCommodity(commodity)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium text-gray-900">
                            {commodity.name}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(commodity.status)}`}>
                            {commodity.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {commodity.id}
                        </div>
                        <div className="text-xs text-gray-500">
                          Driver: {commodity.driver}
                        </div>
                        <div className="text-xs text-gray-500">
                          ETA: {commodity.estimatedArrival.toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  {commodities.length > itemsPerPage && (
                    <div className="flex justify-between items-center mt-3 pt-3 border-t">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-2 py-1 text-xs bg-gray-100 rounded disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="text-xs text-gray-500">
                        {currentPage} of {Math.ceil(commodities.length / itemsPerPage)}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(commodities.length / itemsPerPage)))}
                        disabled={currentPage === Math.ceil(commodities.length / itemsPerPage)}
                        className="px-2 py-1 text-xs bg-gray-100 rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-500">No active shipments</p>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedCommodity ? selectedCommodity.name : 'Select a shipment to track'}
                </h2>
                {selectedCommodity && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedCommodity.status)}`}>
                    {selectedCommodity.status}
                  </span>
                )}
              </div>
              
              {selectedCommodity && (
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Tracking ID</div>
                    <div className="font-semibold text-gray-900">{selectedCommodity.id}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Driver</div>
                    <div className="font-semibold text-gray-900">{selectedCommodity.driver}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">ETA</div>
                    <div className="font-semibold text-gray-900">{selectedCommodity.estimatedArrival.toLocaleTimeString()}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-3 bg-blue-50 border-b border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 text-sm">
                  <span className="w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">!</span>
                  <span>Real-time tracking with GPS and route optimization</span>
                </div>
              </div>
              <TrackingMapComponent 
                selectedCommodity={selectedCommodity} 
                commodities={commodities}
              />
            </div>
          </div>

          {/* Right Sidebar - Live Communication */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Tracking Updates
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Users className="h-4 w-4" />
                  {connectedUsers} users monitoring
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {selectedCommodity ? (
                  filteredTrackingMessages.length > 0 ? (
                    filteredTrackingMessages.map((msg) => (
                      <div key={msg.id} className={`p-3 rounded-lg ${
                        msg.type === 'status' ? 'bg-blue-50 border border-blue-200' : 
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
                    ))
                  ) : (
                    <div className="text-center text-gray-500 text-sm py-8">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No updates for this shipment yet</p>
                    </div>
                  )
                ) : (
                  <div className="text-center text-gray-500 text-sm py-8">
                    <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Select a shipment to view tracking updates</p>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              
              {selectedCommodity && selectedCommodity.status !== 'delivered' && (
                <div className="p-4 border-t">
                   <button
                      onClick={() => {
                        sendStatusUpdate('Delivered');
                        setCommodities(prev => prev.map(c => 
                          c.id === selectedCommodity.id ? {...c, status: 'delivered' as const} : c
                        ));
                        setShowDeliveryModal(true);
                      }}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 flex items-center justify-center gap-2 font-medium"
                    >
                      Mark as Delivered
                    </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showDeliveryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delivery Confirmed!
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {selectedCommodity?.name} has been marked as delivered successfully.
              </p>
              <button
                onClick={() => setShowDeliveryModal(false)}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}