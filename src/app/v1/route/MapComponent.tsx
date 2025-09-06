'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { RouteData } from './types';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  route: RouteData | null;
  selectedRouteIndex: number;
  userLocation?: { lat: number; lng: number; accuracy: number } | null;
}

export default function MapComponent({ route, selectedRouteIndex, userLocation }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map centered on Davao region, Mindanao, Philippines
    mapRef.current = L.map(mapContainerRef.current).setView([7.0731, 125.6128], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !route?.routes?.length) return;

    const map = mapRef.current;

    // Remove existing markers and polylines
    map.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.Circle) {
        map.removeLayer(layer);
      }
    });

    // Display all routes with different styles
    route.routes.forEach((routeData, index: number) => {
      const coordinates = routeData.geometry.coordinates;
      const latLngs = coordinates.map(([lng, lat]: number[]) => [lat, lng] as [number, number]);
      
      const isSelected = index === selectedRouteIndex;
      const hasTraffic = (routeData.summary.trafficDelay || 0) > 60;
      
      // Route styling based on selection and traffic
      const routeColor = isSelected 
        ? (hasTraffic ? '#EF4444' : '#3B82F6') 
        : '#9CA3AF';
      const routeWeight = isSelected ? 5 : 3;
      const routeOpacity = isSelected ? 0.9 : 0.5;
      
      L.polyline(latLngs, { 
        color: routeColor, 
        weight: routeWeight, 
        opacity: routeOpacity 
      }).addTo(map);
    });

    // Add markers for selected route
    const selectedRoute = route.routes[selectedRouteIndex];
    const selectedCoords = selectedRoute.geometry.coordinates;
    const selectedLatLngs = selectedCoords.map(([lng, lat]: number[]) => [lat, lng] as [number, number]);

    const markerIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    L.marker(selectedLatLngs[0], { icon: markerIcon }).addTo(map).bindPopup('Start Location');
    L.marker(selectedLatLngs[selectedLatLngs.length - 1], { icon: markerIcon }).addTo(map).bindPopup('Destination');

    // Add user location if available
    if (userLocation) {
      const userIcon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3B82F6" width="24" height="24">
            <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="white" stroke-width="2"/>
          </svg>
        `),
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      
      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup('Your Location');
      
      // Add accuracy circle
      L.circle([userLocation.lat, userLocation.lng], {
        radius: userLocation.accuracy,
        color: '#3B82F6',
        fillColor: '#3B82F6',
        fillOpacity: 0.1,
        weight: 1
      }).addTo(map);
    }

    // Fit map to selected route
    const selectedPolyline = L.polyline(selectedLatLngs);
    map.fitBounds(selectedPolyline.getBounds(), { padding: [20, 20] });
  }, [route, selectedRouteIndex, userLocation]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="z-0 h-96 w-full" />
      {route?.routes?.length! > 1 && (
        <div className="absolute top-2 right-2 text-black/70 bg-white p-2 rounded shadow text-xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-1 bg-blue-500"></div>
            <span>Selected Route</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-1 bg-red-500"></div>
            <span>Heavy Traffic</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-1 bg-gray-400"></div>
            <span>Alternative</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Your Location</span>
          </div>
        </div>
      )}
    </div>
  );
}