"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Package, 
  Clock, 
  Truck,
  Calendar,
  DollarSign,
  Filter,
  X,
  MapPin,
  User
} from "lucide-react";
import { BusinessShipment, sampleBusinessShipments } from "@/constants";

export default function BusinessShipments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("all");
  const [selectedShipment, setSelectedShipment] = useState<BusinessShipment | null>(null);
  const [shipments, setShipments] = useState<BusinessShipment[]>([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    
    // Add sample data if no bookings exist
    if (storedBookings.length === 0) {
      localStorage.setItem("bookings", JSON.stringify(sampleBusinessShipments));
      setShipments(sampleBusinessShipments);
    } else {
      setShipments(storedBookings);
    }
    
    // Check for shipmentId in URL params and auto-open modal
    const shipmentId = searchParams.get('shipmentId');
    if (shipmentId) {
      const shipment = [...sampleBusinessShipments, ...storedBookings].find(s => s.id === shipmentId);
      if (shipment) {
        setSelectedShipment(shipment);
      }
    }
  }, [searchParams]);

  const filteredShipments = shipments.filter(shipment => {
    if (filter === "all") return true;
    return shipment.status.toLowerCase() === filter.toLowerCase();
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "in transit": return "bg-blue-100 text-blue-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mb-8">
      <div className="max-w-7xl mx-auto">

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filter by status:</span>
            <div className="flex gap-2">
              {["all", "confirmed", "pending", "in transit", "delivered", "cancelled"].map((status) => (
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

        {/* Shipments List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">All Shipments ({filteredShipments.length})</h3>
          {filteredShipments.length > 0 ? (
            <div className="space-y-4">
              {filteredShipments.map((shipment) => (
                <div 
                  key={shipment.id} 
                  onClick={() => setSelectedShipment(shipment)}
                  className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Package className="h-6 w-6 text-blue-600" />
                      <div>
                        <span className="font-semibold text-lg text-gray-900">Shipment to {shipment.distributorName}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{new Date(shipment.bookingDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                      {shipment.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="font-medium text-gray-900">{shipment.vehicleType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium text-gray-900">{shipment.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-medium text-gray-900">₱{shipment.estimatedCost || Math.floor(Math.random() * 5000 + 1000)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">ID:</span>
                      <span className="font-medium text-gray-900">#{shipment.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No shipments found</h3>
              <p className="text-gray-600">No shipments match the selected filter.</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedShipment && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Shipment Details</h3>
                  <button
                    onClick={() => setSelectedShipment(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="h-6 w-6 text-blue-600" />
                    <span className="text-xl font-semibold text-gray-900">Shipment to {selectedShipment.distributorName}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-700">{new Date(selectedShipment.bookingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="font-medium text-gray-700">{selectedShipment.vehicleType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium text-gray-700">{selectedShipment.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-medium text-gray-700">₱{selectedShipment.estimatedCost || Math.floor(Math.random() * 5000 + 1000)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-green-600" />
                    Distributor Information
                  </h4>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{selectedShipment.distributorName}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedShipment.status)}`}>
                        {selectedShipment.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{selectedShipment.distributorEmail}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    Commodity Details
                  </h4>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Type:</span>
                        <div className="font-medium text-gray-900">{selectedShipment.commodityType || "Agricultural Products"}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Weight:</span>
                        <div className="font-medium text-gray-900">{selectedShipment.weight || selectedShipment.capacity}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Pickup:</span>
                        <div className="font-medium text-gray-900">{selectedShipment.pickupLocation || "Farm Location"}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Delivery:</span>
                        <div className="font-medium text-gray-900">{selectedShipment.deliveryLocation || "Distribution Center"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}