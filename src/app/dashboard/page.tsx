"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const vehicles = [
  { id: 1, type: "Heavy", driver: "John Doe", location: "Warehouse A", status: "Available", capacity: "20 tons", image: "/api/placeholder/300/200", phone: "+1234567890", experience: "5 years" },
  { id: 2, type: "Medium", driver: "Jane Smith", location: "Farm District", status: "In Transit", capacity: "10 tons", image: "/api/placeholder/300/200", phone: "+1234567891", experience: "3 years" },
  { id: 3, type: "Light", driver: "Mike Johnson", location: "City Center", status: "Available", capacity: "3 tons", image: "/api/placeholder/300/200", phone: "+1234567892", experience: "2 years" },
  { id: 4, type: "Heavy", driver: "Sarah Wilson", location: "Port Area", status: "Loading", capacity: "25 tons", image: "/api/placeholder/300/200", phone: "+1234567893", experience: "7 years" },
  { id: 5, type: "Medium", driver: "Tom Brown", location: "Rural Route", status: "Available", capacity: "12 tons", image: "/api/placeholder/300/200", phone: "+1234567894", experience: "4 years" },
];

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [selectedWeight, setSelectedWeight] = useState("All");
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(currentUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  const filteredVehicles = selectedWeight === "All" 
    ? vehicles 
    : vehicles.filter(v => v.type === selectedWeight);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {user.role === "distributor" ? "Distributor" : "Vehicle Owner"} Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="text-[#15B9CC] hover:underline">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {user.role === "distributor" ? (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Weight Class
              </label>
              <select
                value={selectedWeight}
                onChange={(e) => setSelectedWeight(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15B9CC]"
              >
                <option value="All">All Vehicles</option>
                <option value="Heavy">Heavy (20+ tons)</option>
                <option value="Medium">Medium (10-20 tons)</option>
                <option value="Light">Light (Under 10 tons)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.type} vehicle`}
                    className="w-full h-48 object-cover bg-gray-200"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vehicle.type === 'Heavy' ? 'bg-red-100 text-red-800' :
                        vehicle.type === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {vehicle.type}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                        vehicle.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {vehicle.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{vehicle.driver}</h3>
                    <p className="text-sm text-gray-600 mb-1">{vehicle.location}</p>
                    <p className="text-sm font-medium text-[#15B9CC]">{vehicle.capacity}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedVehicle && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50"
                onClick={() => setSelectedVehicle(null)}
              >
                <div 
                  className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Vehicle Details</h2>
                    <button
                      onClick={() => setSelectedVehicle(null)}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      ×
                    </button>
                  </div>
                  <img
                    src={selectedVehicle.image}
                    alt={`${selectedVehicle.type} vehicle`}
                    className="w-full h-48 object-cover rounded-lg mb-4 bg-gray-200"
                  />
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-black">Type:</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedVehicle.type === 'Heavy' ? 'bg-red-100 text-red-800' :
                        selectedVehicle.type === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedVehicle.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-black">Driver:</span>
                      <span>{selectedVehicle.driver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-black">Phone:</span>
                      <span>{selectedVehicle.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-black">Experience:</span>
                      <span>{selectedVehicle.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-black">Location:</span>
                      <span>{selectedVehicle.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-black">Capacity:</span>
                      <span>{selectedVehicle.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-black">Status:</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedVehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                        selectedVehicle.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedVehicle.status}
                      </span>
                    </div>
                  </div>
                  {selectedVehicle.status === 'Available' && (
                    <button className="w-full mt-4 bg-[#15B9CC] text-white py-2 px-4 rounded-lg hover:bg-[#13a5b7] transition-colors">
                      Book Vehicle
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">My Vehicles</h3>
                <p className="text-3xl font-bold text-[#15B9CC]">5</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Jobs</h3>
                <p className="text-3xl font-bold text-orange-500">2</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Revenue</h3>
                <p className="text-3xl font-bold text-green-500">$2,450</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">My Fleet</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {vehicles.map((vehicle) => (
                      <tr key={vehicle.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            vehicle.type === 'Heavy' ? 'bg-red-100 text-red-800' :
                            vehicle.type === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {vehicle.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.driver}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.capacity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                            vehicle.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {vehicle.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
