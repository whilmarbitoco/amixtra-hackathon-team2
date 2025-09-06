'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { io, Socket } from 'socket.io-client';
import { MapPin, Clock, MessageCircle, Send, Users, Navigation } from 'lucide-react';
import type { RouteData, LocationSuggestion } from './types';
import { log } from 'console';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
});

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'alert';
}

interface RouteHistory {
  id: string;
  from: string;
  to: string;
  date: Date;
  duration: number;
  distance: number;
}

interface UserLocation {
  lat: number;
  lng: number;
  accuracy: number;
}

export default function RoutePage() {
  const [start, setStart] = useState('');
  const [finish, setFinish] = useState('');
  const [route, setRoute] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [startSuggestions, setStartSuggestions] = useState<LocationSuggestion[]>([]);
  const [finishSuggestions, setFinishSuggestions] = useState<LocationSuggestion[]>([]);
  const [showStartSuggestions, setShowStartSuggestions] = useState(false);
  const [showFinishSuggestions, setShowFinishSuggestions] = useState(false);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [isRouteLocked, setIsRouteLocked] = useState(false);
  
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

  // Initialize location tracking and socket connection
  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => console.error('Location error:', error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }

    // Load route history from localStorage
    const savedHistory = localStorage.getItem('routeHistory');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory).map((route: any) => ({
        ...route,
        date: new Date(route.date)
      }));
      setRouteHistory(parsedHistory);
    }

    // Initialize socket connection
    const newSocket = io('http://localhost:8080');
    
    newSocket.on('connect', () => {
      console.log('Connected to chat server');
    });
    
    newSocket.on('message', (message: ChatMessage) => {
      console.log(message);
      
      setChatMessages(prev => [...prev, message]);
    });
    
    newSocket.on('userCount', (count: number) => {
      setConnectedUsers(count);
    });
    
    setSocket(newSocket);

    const handleClickOutside = (event: MouseEvent) => {
      if (startInputRef.current && !startInputRef.current.contains(event.target as Node)) {
        setShowStartSuggestions(false);
      }
      if (finishInputRef.current && !finishInputRef.current.contains(event.target as Node)) {
        setShowFinishSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      newSocket.disconnect();
    };
  }, []);

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

  const selectStartSuggestion = (suggestion: LocationSuggestion) => {
    setStart(suggestion.display_name);
    setShowStartSuggestions(false);
  };

  const selectFinishSuggestion = (suggestion: LocationSuggestion) => {
    setFinish(suggestion.display_name);
    setShowFinishSuggestions(false);
  };

  const handleRouteCalculation = async () => {
    if (!start || !finish) return;
    
    setLoading(true);
    setError('');
    setRoute(null);
    setSelectedRouteIndex(0);
    setIsRouteLocked(false);
    
    try {
      // Geocode addresses to coordinates
      const startCoords = await geocodeAddress(start);
      const finishCoords = await geocodeAddress(finish);
      
      if (!startCoords) {
        setError('Could not find start location');
        return;
      }
      
      if (!finishCoords) {
        setError('Could not find destination');
        return;
      }
      
      const routeData = await calculateRoute(startCoords, finishCoords);
      if (routeData) {
        setRoute(routeData);
        
        // Save to route history
        const newRoute: RouteHistory = {
          id: Date.now().toString(),
          from: start,
          to: finish,
          date: new Date(),
          duration: routeData.routes[0].summary.duration,
          distance: routeData.routes[0].summary.distance
        };
        
        const updatedHistory = [newRoute, ...routeHistory.slice(0, 4)];
        setRouteHistory(updatedHistory);
        localStorage.setItem('routeHistory', JSON.stringify(updatedHistory));
        
        // Join route-specific chat room
        const routeKey = `${start.split(',')[0]}-${finish.split(',')[0]}`.replace(/[^a-zA-Z0-9]/g, '-');
        setCurrentRoute(routeKey);
        setChatMessages([]);
        socket?.emit('joinRoute', routeKey);
      } else {
        setError('Could not calculate route');
      }
    } catch (error) {
      console.error('Error calculating route:', error);
      setError('An error occurred while calculating the route');
    } finally {
      setLoading(false);
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
    
    socket?.emit('sendMessage', { route: currentRoute, message });
    setNewMessage('');
  };

  const sendAlert = (alertType: string) => {
    if (!socket || !currentRoute) return;
    
    const alert: ChatMessage = {
      id: Date.now().toString(),
      user: 'System',
      message: `⚠️ ${alertType} reported on this route`,
      timestamp: new Date(),
      type: 'alert'
    };
    
    socket?.emit('sendMessage', { route: currentRoute, message: alert });
  };

  const searchLocations = async (query: string): Promise<LocationSuggestion[]> => {
    if (query.length < 2) return [];
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&bounded=1&viewbox=124.5,8.5,126.5,5.5&countrycodes=ph`
      );
      const data = await response.json();
      return data.map((item: any) => ({
        display_name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon)
      }));
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  };

  const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=ph`);
      const data = await response.json();
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    return null;
  };

  const getElevationData = async (coordinates: [number, number][]): Promise<number[]> => {
    try {
      const locations = coordinates.map(([lat, lng]) => `${lat},${lng}`).join('|');
      const response = await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${locations}`);
      const data = await response.json();
      return data.results.map((result: any) => result.elevation);
    } catch (error) {
      console.error('Elevation API error:', error);
      return coordinates.map(() => 0);
    }
  };

  const calculateTerrainScore = (elevations: number[]): number => {
    if (elevations.length < 2) return 0;
    let totalElevationChange = 0;
    for (let i = 1; i < elevations.length; i++) {
      totalElevationChange += Math.abs(elevations[i] - elevations[i - 1]);
    }
    return totalElevationChange;
  };

  const calculateRoute = async (start: [number, number], finish: [number, number]): Promise<RouteData | null> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY || 'demo_key';
      
      const response = await fetch(
        `https://api.tomtom.com/routing/1/calculateRoute/${start[0]},${start[1]}:${finish[0]},${finish[1]}/json?key=${apiKey}&traffic=true&routeType=fastest&maxAlternatives=3&computeTravelTimeFor=all`
      );
      
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        const routesWithTerrain = await Promise.all(
          data.routes.map(async (route: any) => {
            const coordinates = route.legs[0].points.map((point: any) => [point.latitude, point.longitude] as [number, number]);
            const elevations = await getElevationData(coordinates.slice(0, 10)); // Sample points for performance
            const terrainScore = calculateTerrainScore(elevations);
            
            return {
              geometry: {
                coordinates: route.legs[0].points.map((point: any) => [point.longitude, point.latitude])
              },
              summary: {
                distance: route.summary.lengthInMeters,
                duration: route.summary.travelTimeInSeconds,
                trafficDelay: route.summary.trafficDelayInSeconds || 0,
                noTrafficDuration: route.summary.noTrafficTravelTimeInSeconds,
                terrainScore,
                elevationGain: Math.max(...elevations) - Math.min(...elevations)
              }
            };
          })
        );
        
        // Sort by combined score: time + terrain difficulty
        const sortedRoutes = routesWithTerrain.sort((a: any, b: any) => {
          const scoreA = a.summary.travelTimeInSeconds + (a.summary.terrainScore * 0.1);
          const scoreB = b.summary.travelTimeInSeconds + (b.summary.terrainScore * 0.1);
          return scoreA - scoreB;
        });
        
        return { routes: sortedRoutes };
      }
    } catch (error) {
      console.error('TomTom routing error:', error);
      return await calculateFallbackRoute(start, finish);
    }
    return null;
  };
  
  const calculateFallbackRoute = async (start: [number, number], finish: [number, number]): Promise<RouteData | null> => {
    try {
      const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${finish[1]},${finish[0]}?overview=full&geometries=geojson`);
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        return {
          routes: [{
            geometry: data.routes[0].geometry,
            summary: {
              distance: data.routes[0].distance,
              duration: data.routes[0].duration,
              trafficDelay: 0,
              noTrafficDuration: data.routes[0].duration
            }
          }]
        };
      }
    } catch (error) {
      console.error('Fallback routing error:', error);
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-black py-6 px-4 mb-2">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Smart Route Navigator</h1>
          <p className="text-black/90">Plan your journey with AI-optimized routes that adapt to real-time conditions</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Route History & Current Location */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current Location */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Navigation className="h-5 w-5 text-blue-600" />
                Current Location
              </h3>
              {userLocation ? (
                <div className="text-sm text-gray-600">
                  <p>Lat: {userLocation.lat.toFixed(6)}</p>
                  <p>Lng: {userLocation.lng.toFixed(6)}</p>
                  <p className="text-xs mt-1">Accuracy: ±{Math.round(userLocation.accuracy)}m</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Getting location...</p>
              )}
            </div>

            {/* Route History */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                Recent Routes
              </h3>
              {routeHistory.length > 0 ? (
                <div className="space-y-3">
                  {(() => {
                    const groupedRoutes = routeHistory.reduce((acc, route) => {
                      const key = `${route.from.split(',')[0]}-${route.to.split(',')[0]}`;
                      if (!acc[key]) {
                        acc[key] = { ...route, count: 1 };
                      } else {
                        acc[key].count++;
                        if (route.date > acc[key].date) {
                          acc[key] = { ...route, count: acc[key].count };
                        }
                      }
                      return acc;
                    }, {} as Record<string, RouteHistory & { count: number }>);
                    
                    return Object.values(groupedRoutes).map((route) => (
                      <div key={route.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                           onClick={() => { 
                             setStart(route.from); 
                             setFinish(route.to);
                             setTimeout(() => handleRouteCalculation(), 100);
                           }}>
                        <div className="flex justify-between items-start mb-1">
                          <div className="text-sm font-medium text-gray-900">
                            {route.from.split(',')[0]} → {route.to.split(',')[0]}
                          </div>
                          {route.count > 1 && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {route.count}x
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {route.date?.toLocaleDateString()} • {Math.round(route.duration / 60)}min
                        </div>
                      </div>
                    ));
                  })()
                  }
                </div>
              ) : (
                <p className="text-sm text-gray-500">No recent routes</p>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div className="relative" ref={startInputRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Location
                  </label>
                  <input
                    type="text"
                    value={start}
                    onChange={(e) => handleStartInputChange(e.target.value)}
                    onFocus={() => start.length >= 2 && setShowStartSuggestions(true)}
                    placeholder="Enter start address in Davao region"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900 placeholder-gray-500"
                  />
                  {showStartSuggestions && startSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {startSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => selectStartSuggestion(suggestion)}
                          className="z-[100] px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0 text-gray-800 hover:text-blue-800"
                        >
                          {suggestion.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative" ref={finishInputRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={finish}
                    onChange={(e) => handleFinishInputChange(e.target.value)}
                    onFocus={() => finish.length >= 2 && setShowFinishSuggestions(true)}
                    placeholder="Enter destination in Davao region"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900 placeholder-gray-500"
                  />
                  {showFinishSuggestions && finishSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {finishSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => selectFinishSuggestion(suggestion)}
                          className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0 text-gray-800 hover:text-blue-800"
                        >
                          {suggestion.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleRouteCalculation}
                  disabled={!start || !finish || loading}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Calculating...
                    </>
                  ) : (
                    'Find Route'
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-3 bg-blue-50 border-b border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 text-sm">
                  <span className="w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">!</span>
                  <span>AI-powered routing with terrain, traffic, and weather awareness.</span>
                </div>
              </div>
              <MapComponent route={route} selectedRouteIndex={selectedRouteIndex} userLocation={userLocation} />
              {route && route.routes && route.routes.length > 0 && (
                <div className="p-4 bg-gray-50 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3">Route Options</h3>
                  <div className="overflow-y-auto space-y-3 pr-2">
                    {route.routes.map((routeOption, index: number) => {
                      const isSelected = index === selectedRouteIndex;
                      const trafficDelay = routeOption.summary.trafficDelay || 0;
                      const hasTraffic = trafficDelay > 60;
                      
                      return (
                        <div
                          key={index}
                          onClick={() => !isRouteLocked && setSelectedRouteIndex(index)}
                          className={`p-3 rounded-lg border transition-colors ${
                            isSelected ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-gray-300 hover:border-emerald-300 bg-white hover:bg-emerald-50'
                          } ${
                            isRouteLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium text-sm ${
                                isSelected ? 'text-emerald-800' : 'text-gray-800'
                              }`}>
                                Route {index + 1} {index === 0 ? '(Recommended)' : ''}
                              </span>
                              {hasTraffic && (
                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                  Heavy Traffic
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Distance: </span>
                              <span className={`font-medium ${
                                isSelected ? 'text-emerald-800' : 'text-gray-800'
                              }`}>{(routeOption.summary.distance / 1000).toFixed(1)} km</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Duration: </span>
                              <span className={`font-medium ${
                                isSelected ? 'text-emerald-800' : 'text-gray-800'
                              }`}>{Math.round(routeOption.summary.duration / 60)} min</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Terrain: </span>
                              <span className={`font-medium ${
                                (routeOption.summary as any).elevationGain > 100 ? 'text-orange-600' : 'text-green-600'
                              }`}>
                                {(routeOption.summary as any).elevationGain ? `${Math.round((routeOption.summary as any).elevationGain)}m gain` : 'Flat'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {route && route.routes && route.routes.length > 0 && (
                    <div className="p-4 border-t flex gap-3">
                      {!isRouteLocked ? (
                        <button
                          onClick={() => setIsRouteLocked(true)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                        >
                           Lock Route {selectedRouteIndex + 1}
                        </button>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 text-green-700 font-medium">
                             Route {selectedRouteIndex + 1} Locked
                          </div>
                          <button
                            onClick={() => setIsRouteLocked(false)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                          >
                            Cancel Lock
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Live Chat */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Route Chat
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Users className="h-4 w-4" />
                  {connectedUsers} drivers online
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`p-3 rounded-lg ${
                    msg.type === 'alert' ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm text-gray-900">{msg.user}</span>
                      <span className="text-xs text-gray-500">
                        {msg.timestamp.toString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{msg.message}</p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              
              {currentRoute && (
                <div className="p-4 border-t">
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => sendAlert('Accident')}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs hover:bg-red-200"
                    >
                      🚨 Accident
                    </button>
                    <button
                      onClick={() => sendAlert('Heavy Traffic')}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs hover:bg-yellow-200"
                    >
                      🚦 Traffic
                    </button>
                    <button
                      onClick={() => sendAlert('Road Closure')}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200"
                    >
                      🚧 Closure
                    </button>
                  </div>
                  <div className="flex gap-2">
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}