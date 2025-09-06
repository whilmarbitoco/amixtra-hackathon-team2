"use client";

import { useState } from "react";
import { Truck, MapPin, Clock, DollarSign, User, Phone } from "lucide-react";
import { vehicles } from "@/constants";
import ListingWrapper from "@/components/ListingWrapper";

export default function VehiclesListing() {
  const [filter, setFilter] = useState("All");

  const filteredVehicles = filter === "All" 
    ? vehicles 
    : vehicles.filter(v => v.status === filter);

  return (
    <ListingWrapper 
      title="Available Vehicles" 
      description="Browse and book vehicles for your transportation needs"
    >
      <div className="container mx-auto px-6 py-8">
        {/* Filter */}
        <div className="mb-8">
          <div className="flex gap-3">
            {['All', 'Available', 'In Transit', 'Loading'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {status === 'All' ? 'All Vehicles' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                <Truck className="h-10 w-10 text-gray-400" />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{vehicle.type}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Truck className="h-3 w-3" />
                    <span>{vehicle.capacity}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>Routes</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Ready</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span>Rates</span>
                  </div>
                </div>

                <button 
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  disabled={vehicle.status !== 'Available'}
                >
                  {vehicle.status === 'Available' ? 'Book Vehicle' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ListingWrapper>
  );
}