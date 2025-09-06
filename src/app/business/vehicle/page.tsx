"use client";

import { useState } from "react";
import { Truck, MapPin, Calendar, DollarSign, Phone, Weight, Brain, TrendingUp, Target, Star, Clock } from "lucide-react";

interface Vehicle {
  id: number;
  driverName: string;
  vehicleType: string;
  image: string;
  capacity: string;
  route: string;
  availableDate: string;
  rate: string;
  rating: number;
  phone: string;
  experience: string;
  status: 'Available' | 'Busy';
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    driverName: "Juan Santos",
    vehicleType: "Heavy Truck",
    image: "/api/placeholder/300/200",
    capacity: "15 tons",
    route: "Davao City → Manila",
    availableDate: "Dec 15, 2024",
    rate: "₱25,000",
    rating: 4.8,
    phone: "+63 912 345 6789",
    experience: "8 years",
    status: "Available"
  },
  {
    id: 2,
    driverName: "Maria Cruz",
    vehicleType: "Medium Truck",
    image: "/api/placeholder/300/200",
    capacity: "8 tons",
    route: "Cebu → Bohol",
    availableDate: "Dec 12, 2024",
    rate: "₱15,000",
    rating: 4.9,
    phone: "+63 917 234 5678",
    experience: "5 years",
    status: "Available"
  },
  {
    id: 3,
    driverName: "Roberto Dela Cruz",
    vehicleType: "Van",
    image: "/api/placeholder/300/200",
    capacity: "3 tons",
    route: "Tagum → Davao City",
    availableDate: "Dec 10, 2024",
    rate: "₱8,000",
    rating: 4.7,
    phone: "+63 905 876 5432",
    experience: "3 years",
    status: "Busy"
  },
  {
    id: 4,
    driverName: "Ana Reyes",
    vehicleType: "Light Truck",
    image: "/api/placeholder/300/200",
    capacity: "5 tons",
    route: "Panabo → Tagum",
    availableDate: "Dec 14, 2024",
    rate: "₱12,000",
    rating: 4.6,
    phone: "+63 920 123 4567",
    experience: "6 years",
    status: "Available"
  }
];

export default function VehicleBrowsing() {
  const [filter, setFilter] = useState("All");
  const [aiMatching, setAiMatching] = useState(true);

  const businessPreferences = {
    preferredCapacity: "5-15 tons",
    preferredRoutes: ["Davao City", "Manila", "Cebu"],
    budget: "₱10,000 - ₱30,000",
    urgency: "Within 7 days"
  };

  const filteredVehicles = filter === "All" 
    ? vehicles 
    : vehicles.filter(v => v.status === filter);

  return (
    <>
      {/* AI Matching & Filters Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Smart Vehicle Matching</h3>
            </div>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={aiMatching}
                onChange={(e) => setAiMatching(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">AI Recommendations</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Filter:</span>
            {['All', 'Available', 'Busy'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Business Preferences */}
        <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-gray-900">Capacity: {businessPreferences.preferredCapacity}</span>
          </div>
          
          <div className="text-sm text-gray-600">
            Budget: <span className="font-medium">{businessPreferences.budget}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Routes:</span>
            {businessPreferences.preferredRoutes.map((route, idx) => (
              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                {route}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">92% Match Rate</span>
            <span className="text-sm text-green-600">• {filteredVehicles.length} available vehicles</span>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* Vehicle Image */}
            <div className="relative h-48 bg-gray-200">
              <img 
                src={vehicle.image} 
                alt={vehicle.vehicleType}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  vehicle.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {vehicle.status}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{vehicle.driverName}</h3>
                  <p className="text-gray-600">{vehicle.vehicleType}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{vehicle.rating}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Weight className="h-4 w-4" />
                  <span>Capacity: {vehicle.capacity}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{vehicle.route}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Available: {vehicle.availableDate}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span>Rate: {vehicle.rate}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Experience: {vehicle.experience}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{vehicle.phone}</span>
                </div>
              </div>

              <button 
                className={`w-full mt-6 py-3 rounded-lg font-medium transition-colors ${
                  vehicle.status === 'Available'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={vehicle.status !== 'Available'}
              >
                {vehicle.status === 'Available' ? 'Book Vehicle' : 'Currently Busy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}