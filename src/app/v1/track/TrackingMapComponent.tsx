'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type Commodity } from '@/constants';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface TrackingMapComponentProps {
  selectedCommodity: Commodity | null;
  commodities: Commodity[];
}

export default function TrackingMapComponent({ selectedCommodity, commodities }: TrackingMapComponentProps) {
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
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Remove existing markers and polylines
    map.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.Circle) {
        map.removeLayer(layer);
      }
    });

    // Display all commodities
    commodities.forEach((commodity) => {
      const isSelected = selectedCommodity?.id === commodity.id;
      
      // Create custom icons based on status
      const getStatusIcon = (status: string, isSelected: boolean) => {
        const color = status === 'in-transit' ? '#3B82F6' : 
                     status === 'delivered' ? '#10B981' : 
                     status === 'delayed' ? '#EF4444' : '#F59E0B';
        
        const size = isSelected ? 32 : 24;
        
        return L.icon({
          iconUrl: 'data:image/svg+xml;base64,' + btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="${size}" height="${size}">
              <path d="M3 4h13l3 3v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4zm2 2v11h12V9h-3V6H5zm10 0v1h2l-2-1z"/>
            </svg>
          `),
          iconSize: [size, size],
          iconAnchor: [size/2, size/2]
        });
      };

      // Current location marker
      const currentMarker = L.marker(
        [commodity.currentLocation.lat, commodity.currentLocation.lng], 
        { icon: getStatusIcon(commodity.status, isSelected) }
      ).addTo(map);
      
      currentMarker.bindPopup(`
        <div class="p-2">
          <h3 class="font-semibold">${commodity.name}</h3>
          <p class="text-sm text-gray-600">Status: ${commodity.status}</p>
          <p class="text-sm text-gray-600">Driver: ${commodity.driver}</p>
          <p class="text-sm text-gray-600">ID: ${commodity.id}</p>
        </div>
      `);

      // Destination marker
      const destIcon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#DC2626" width="24" height="24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `),
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      });

      const destMarker = L.marker(
        [commodity.destination.lat, commodity.destination.lng], 
        { icon: destIcon }
      ).addTo(map);
      
      destMarker.bindPopup(`
        <div class="p-2">
          <h3 class="font-semibold">Destination</h3>
          <p class="text-sm text-gray-600">${commodity.destination.address}</p>
          <p class="text-sm text-gray-600">ETA: ${commodity.estimatedArrival.toLocaleString()}</p>
        </div>
      `);

      // Draw route line for selected commodity
      if (isSelected) {
        const routeLine = L.polyline([
          [commodity.currentLocation.lat, commodity.currentLocation.lng],
          [commodity.destination.lat, commodity.destination.lng]
        ], {
          color: commodity.status === 'delayed' ? '#EF4444' : '#3B82F6',
          weight: 3,
          opacity: 0.7,
          dashArray: commodity.status === 'in-transit' ? '10, 5' : undefined
        }).addTo(map);
      }
    });

    // Fit map to show all commodities or selected commodity
    if (selectedCommodity) {
      const bounds = L.latLngBounds([
        [selectedCommodity.currentLocation.lat, selectedCommodity.currentLocation.lng],
        [selectedCommodity.destination.lat, selectedCommodity.destination.lng]
      ]);
      map.fitBounds(bounds, { padding: [20, 20] });
    } else if (commodities.length > 0) {
      const allPoints = commodities.flatMap(c => [
        [c.currentLocation.lat, c.currentLocation.lng],
        [c.destination.lat, c.destination.lng]
      ]);
      const bounds = L.latLngBounds(allPoints as [number, number][]);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [selectedCommodity, commodities]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="z-0 h-96 w-full" />
      <div className="absolute top-2 text-black/70 right-2 bg-white p-2 rounded shadow text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>In Transit</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Delivered</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Delayed</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-blue-500 opacity-70"></div>
          <span>Route Path</span>
        </div>
      </div>
    </div>
  );
}