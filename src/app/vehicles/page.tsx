"use client";

import { useState } from "react";
import { Truck, MapPin, Clock, DollarSign, User, Phone } from "lucide-react";
import { vehicles } from "@/constants";

export default function VehiclesListing() {
  const [filter, setFilter] = useState("All");

  const filteredVehicles = filter === "All" 
    ? vehicles 
    : vehicles.filter(v => v.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-900">Available Vehicles</h1>
        <p className="text-gray-600 mt-2">Browse and book vehicles for your transportation needs</p>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filter */}
        <div className="mb-8">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Vehicles</option>
            <option value="Available">Available</option>
            <option value="In Transit">In Transit</option>
            <option value="Loading">Loading</option>
          </select>
        </div>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={vehicle.image} 
                alt={`${vehicle.type} Vehicle`}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{vehicle.type} Vehicle</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{vehicle.driver} ({vehicle.experience})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{vehicle.route}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{vehicle.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>{vehicle.capacity} capacity</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span>₹{vehicle.chargePerKg}/kg</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{vehicle.phone}</span>
                  </div>
                </div>

                <button 
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  disabled={vehicle.status !== 'Available'}
                >
                  {vehicle.status === 'Available' ? 'Book Vehicle' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}