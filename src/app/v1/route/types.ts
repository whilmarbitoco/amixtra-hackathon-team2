export interface LocationSuggestion {
  display_name: string;
  lat: number;
  lon: number;
}

export interface RouteGeometry {
  coordinates: [number, number][];
}

export interface RouteSummary {
  distance: number;
  duration: number;
  trafficDelay: number;
  noTrafficDuration: number;
}

export interface RouteOption {
  geometry: RouteGeometry;
  summary: RouteSummary;
}

export interface RouteData {
  routes: RouteOption[];
}