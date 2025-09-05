'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  route: any;
}

export default function MapComponent({ route }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map centered on Davao region, Mindanao, Philippines
    mapRef.current = L.map(mapContainerRef.current).setView([7.0731, 125.6128], 10);

    // Add OSM tiles
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
    if (!mapRef.current || !route) return;

    // Clear existing layers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapRef.current!.removeLayer(layer);
      }
    });

    if (route.routes && route.routes.length > 0) {
      const routeData = route.routes[0];
      const coordinates = routeData.geometry.coordinates;
      
      // Convert coordinates to Leaflet format (OSRM uses [lng, lat])
      const latLngs = coordinates.map((coord: number[]) => [coord[1], coord[0]]);
      
      // Add route polyline
      const polyline = L.polyline(latLngs, { color: '#3B82F6', weight: 4, opacity: 0.8 }).addTo(mapRef.current);
      
      // Add start marker
      const startMarker = L.marker([latLngs[0][0], latLngs[0][1]], {
        icon: L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      }).addTo(mapRef.current).bindPopup('Start Location');
      
      // Add end marker
      const endMarker = L.marker([latLngs[latLngs.length - 1][0], latLngs[latLngs.length - 1][1]], {
        icon: L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      }).addTo(mapRef.current).bindPopup('Destination');
      
      // Fit map to route bounds
      mapRef.current.fitBounds(polyline.getBounds(), { padding: [20, 20] });
    }
  }, [route]);

  return <div ref={mapContainerRef} className="h-96 w-full" />;
}