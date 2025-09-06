"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Truck, Plus, Settings, CheckCircle, XCircle, Brain, TrendingUp, Target, Gauge } from "lucide-react";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  capacity: string;
  vehicleType: string;
  status: "active" | "inactive";
  driverId: string;
  image?: string;
}

export default function DriverVehicles() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    licensePlate: "",
    capacity: "",
    vehicleType: "truck",
    image: ""
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user || (user.role !== "driver" && user.role !== "vehicle_owner")) {
      router.push("/login");
      return;
    }
    setCurrentUser(user);
    initializeMockData(user.id);
    loadVehicles(user.id);
  }, [router]);

  const initializeMockData = (driverId: string) => {
    const existingVehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
    const userVehicles = existingVehicles.filter((v: Vehicle) => v.driverId === driverId);
    
    if (userVehicles.length === 0) {
      const mockVehicles: Vehicle[] = [
        {
          id: "1",
          make: "Ford",
          model: "F-150",
          year: "2022",
          licensePlate: "ABC-123",
          capacity: "2.5",
          vehicleType: "pickup",
          status: "active",
          driverId: driverId,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
        },
        {
          id: "2",
          make: "Chevrolet",
          model: "Silverado",
          year: "2021",
          licensePlate: "XYZ-789",
          capacity: "3.0",
          vehicleType: "truck",
          status: "active",
          driverId: driverId,
          image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400"
        },
        {
          id: "3",
          make: "Mercedes",
          model: "Sprinter",
          year: "2020",
          licensePlate: "DEF-456",
          capacity: "1.5",
          vehicleType: "van",
          status: "inactive",
          driverId: driverId,
          image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400"
        }
      ];
      
      const allVehicles = [...existingVehicles, ...mockVehicles];
      localStorage.setItem("vehicles", JSON.stringify(allVehicles));
    }
  };

  const loadVehicles = (driverId: string) => {
    const storedVehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
    const userVehicles = storedVehicles.filter((v: Vehicle) => v.driverId === driverId);
    setVehicles(userVehicles);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      ...formData,
      status: "active",
      driverId: currentUser.id
    };

    const storedVehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
    const updatedVehicles = [...storedVehicles, newVehicle];
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
    
    setVehicles([...vehicles, newVehicle]);
    setFormData({
      make: "",
      model: "",
      year: "",
      licensePlate: "",
      capacity: "",
      vehicleType: "truck",
      image: ""
    });
    setShowForm(false);
  };

  const toggleVehicleStatus = (vehicleId: string) => {
    const storedVehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
    const updatedVehicles = storedVehicles.map((v: Vehicle) => 
      v.id === vehicleId ? { ...v, status: v.status === "active" ? "inactive" : "active" } : v
    );
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
    loadVehicles(currentUser.id);
  };

  if (!currentUser) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Register New Vehicle</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                  <input
                    type="text"
                    value={formData.make}
                    onChange={(e) => setFormData({...formData, make: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
                  <input
                    type="text"
                    value={formData.licensePlate}
                    onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (tons)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  >
                    <option value="truck">Truck</option>
                    <option value="van">Van</option>
                    <option value="pickup">Pickup</option>
                    <option value="trailer">Trailer</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    placeholder="https://example.com/vehicle-image.jpg"
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img src={formData.image} alt="Preview" className="w-32 h-24 object-cover rounded-lg" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Vehicle Analysis */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">AI Fleet Analysis</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">Fleet Optimized</span>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Register Vehicle
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Fleet Efficiency</p>
              <p className="text-lg font-semibold text-gray-900">92%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Gauge className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Capacity Utilization</p>
              <p className="text-lg font-semibold text-gray-900">78%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Truck className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Vehicles</p>
              <p className="text-lg font-semibold text-gray-900">{vehicles.filter(v => v.status === 'active').length}/{vehicles.length}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-6">
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Fleet Composition:</span>
              {vehicles.reduce((acc, vehicle) => {
                acc[vehicle.vehicleType] = (acc[vehicle.vehicleType] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
              && Object.entries(vehicles.reduce((acc, vehicle) => {
                acc[vehicle.vehicleType] = (acc[vehicle.vehicleType] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)).map(([type, count], idx) => (
                <span key={idx} className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs capitalize">
                  {count} {type}{count > 1 ? 's' : ''}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-600">Total Capacity:</span>
              <span className="text-sm font-medium text-gray-900">
                {vehicles.reduce((sum, v) => sum + parseFloat(v.capacity), 0).toFixed(1)} tons
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      {vehicles.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Truck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles registered yet</h3>
          <p className="text-gray-600 mb-6">Start by registering your first vehicle to begin accepting deliveries</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register Your First Vehicle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {vehicle.image ? (
                <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <Truck className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {vehicle.year} {vehicle.make}
                    </h3>
                    <p className="text-sm text-gray-600">{vehicle.model}</p>
                  </div>
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    vehicle.status === "active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {vehicle.status === "active" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    {vehicle.status}
                  </span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">License Plate:</span>
                    <span className="text-sm font-medium text-gray-900">{vehicle.licensePlate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Capacity:</span>
                    <span className="text-sm font-medium text-gray-900">{vehicle.capacity} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Type:</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">{vehicle.vehicleType}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleVehicleStatus(vehicle.id)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      vehicle.status === "active"
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {vehicle.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}