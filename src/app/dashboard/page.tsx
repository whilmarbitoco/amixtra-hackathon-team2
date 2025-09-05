"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VehicleCard from "@/components/VehicleCard";
import VehicleModal from "@/components/VehicleModal";
import StatsCard from "@/components/StatsCard";
import BookingsTable from "@/components/BookingsTable";
import FleetTable from "@/components/FleetTable";
import Navigation from "@/components/Navigation";

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
  const [bookings, setBookings] = useState<any[]>([]);
  const [vehicleList, setVehicleList] = useState(vehicles);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(currentUser));
      const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      setBookings(storedBookings);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  const handleBooking = (vehicle: any) => {
    const booking = {
      id: Date.now(),
      vehicleId: vehicle.id,
      vehicleType: vehicle.type,
      driver: vehicle.driver,
      capacity: vehicle.capacity,
      distributorName: user.name,
      distributorEmail: user.email,
      bookingDate: new Date().toISOString(),
      status: "Booked"
    };
    
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    
    const updatedVehicles = vehicleList.map(v => 
      v.id === vehicle.id ? { ...v, status: "Booked" } : v
    );
    setVehicleList(updatedVehicles);
    
    alert("Vehicle booked successfully!");
    setSelectedVehicle(null);
  };

  const filteredVehicles = selectedWeight === "All" 
    ? vehicleList 
    : vehicleList.filter(v => v.type === selectedWeight);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        title={`${user.role === "distributor" ? "Distributor" : "Vehicle Owner"} Dashboard`}
        userName={user.name}
        onLogout={handleLogout}
      />

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
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onClick={setSelectedVehicle}
                />
              ))}
            </div>

            <VehicleModal
              vehicle={selectedVehicle}
              isOpen={!!selectedVehicle}
              onClose={() => setSelectedVehicle(null)}
              onBook={handleBooking}
              showBookButton={true}
            />
          </>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <StatsCard title="Total Bookings" value={bookings.length} />
              <StatsCard title="My Vehicles" value={5} color="#f97316" />
              <StatsCard title="Revenue" value="$2,450" color="#22c55e" />
            </div>

            <BookingsTable bookings={bookings} />
            <FleetTable vehicles={vehicleList} />
          </>
        )}
      </div>
    </div>
  );
}
