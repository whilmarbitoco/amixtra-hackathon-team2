'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { RouteData, LocationSuggestion } from './types';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
});

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
  
  const startInputRef = useRef<HTMLDivElement>(null);
  const finishInputRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startInputRef.current && !startInputRef.current.contains(event.target as Node)) {
        setShowStartSuggestions(false);
      }
      if (finishInputRef.current && !finishInputRef.current.contains(event.target as Node)) {
        setShowFinishSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const calculateRoute = async (start: [number, number], finish: [number, number]): Promise<RouteData | null> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY || 'demo_key';
      
      const response = await fetch(
        `https://api.tomtom.com/routing/1/calculateRoute/${start[0]},${start[1]}:${finish[0]},${finish[1]}/json?key=${apiKey}&traffic=true&routeType=fastest&maxAlternatives=3&computeTravelTimeFor=all`
      );
      
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        const sortedRoutes = data.routes.sort((a: any, b: any) => 
          a.summary.travelTimeInSeconds - b.summary.travelTimeInSeconds
        );
        
        return {
          routes: sortedRoutes.map((route: any) => ({
            geometry: {
              coordinates: route.legs[0].points.map((point: any) => [point.longitude, point.latitude])
            },
            summary: {
              distance: route.summary.lengthInMeters,
              duration: route.summary.travelTimeInSeconds,
              trafficDelay: route.summary.trafficDelayInSeconds || 0,
              noTrafficDuration: route.summary.noTrafficTravelTimeInSeconds
            }
          }))
        };
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Route Planner</h1>
        
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {showStartSuggestions && startSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {startSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => selectStartSuggestion(suggestion)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {showFinishSuggestions && finishSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {finishSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => selectFinishSuggestion(suggestion)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
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
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
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
          <MapComponent route={route} selectedRouteIndex={selectedRouteIndex} />
          {route && route.routes && route.routes.length > 0 && (
            <div className="p-4 bg-gray-50 border-t">
              <h3 className="font-semibold text-gray-900 mb-3">Route Options</h3>
              <div className="space-y-3">
                {route.routes.map((routeOption, index: number) => {
                  const isSelected = index === selectedRouteIndex;
                  const trafficDelay = routeOption.summary.trafficDelay || 0;
                  const hasTraffic = trafficDelay > 60; // More than 1 minute delay
                  
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedRouteIndex(index)}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
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
                          <span className="font-medium">{(routeOption.summary.distance / 1000).toFixed(1)} km</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration: </span>
                          <span className="font-medium">{Math.round(routeOption.summary.duration / 60)} min</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Traffic Delay: </span>
                          <span className={`font-medium ${hasTraffic ? 'text-red-600' : 'text-green-600'}`}>
                            {trafficDelay > 0 ? `+${Math.round(trafficDelay / 60)} min` : 'None'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}