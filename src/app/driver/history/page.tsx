"use client";

import { useState } from "react";
import { 
  MapPin, 
  Clock, 
  Navigation,
  Calendar,
  DollarSign,
  Filter,
  X,
  Package
} from "lucide-react";
import { driverRoutes, mockTransportedCommodities } from "@/constants";

export default function DriverHistory() {
  const [filter, setFilter] = useState("all");
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  const filteredRoutes = driverRoutes.filter(route => {
    if (filter === "all") return true;
    return route.status.toLowerCase() === filter;
  });



  return (
    <div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-900">Filter by status:</span>
          <div className="flex gap-2">
            {["all", "completed", "ongoing", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">All Routes ({filteredRoutes.length})</h3>
        <div className="space-y-4">
          {filteredRoutes.map((route) => (
            <div 
              key={route.id} 
              onClick={() => setSelectedRoute(route)}
              className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <div>
                    <span className="font-semibold text-lg text-gray-900">{route.from} → {route.to}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{route.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  route.status === "Completed" 
                    ? "bg-green-100 text-green-800"
                    : route.status === "Ongoing"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {route.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Distance:</span>
                  <span className="font-medium text-gray-900">{route.distance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-gray-900">{route.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Earnings:</span>
                  <span className="font-medium text-gray-900">₱{Math.floor(Math.random() * 2000 + 500)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Route ID:</span>
                  <span className="font-medium text-gray-900">#{route.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedRoute && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Route Details</h3>
                <button
                  onClick={() => setSelectedRoute(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <span className="text-xl font-semibold text-gray-900">{selectedRoute.from} → {selectedRoute.to}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-700">{selectedRoute.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium text-gray-700">{selectedRoute.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-gray-700">{selectedRoute.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Earnings:</span>
                    <span className="font-medium text-gray-700">₱{Math.floor(Math.random() * 2000 + 500)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-600" />
                  Transported Commodities
                </h4>
                <div className="space-y-3">
                  {mockTransportedCommodities.map((commodity, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{commodity.name}</span>
                        <span className="text-sm text-gray-600">Quantity: {commodity.quantity}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Weight: {commodity.weight}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}