"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VehicleCard from "@/components/VehicleCard";
import VehicleModal from "@/components/VehicleModal";
import StatsCard from "@/components/StatsCard";
import BookingsTable from "@/components/BookingsTable";
import FleetTable from "@/components/FleetTable";
import Navigation from "@/components/Navigation";
import PageWrapper from "@/components/PageWrapper";
import { vehicles } from "@/constants";


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
      const userData = JSON.parse(currentUser);
      setUser(userData);
      
      // Route based on user role
      if (userData.role === "driver") {
        router.push("/dashboard/driver");
        return;
      } else if (userData.role === "vehicle_owner") {
        router.push("/dashboard/business");
        return;
      }
      
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

  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#15B9CC]"></div>
    </div>
  );

  return (
    <PageWrapper showFooter={false}>
      <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <Navigation 
        title={`${user.role === "distributor" ? "Distributor" : "Vehicle Owner"} Dashboard`}
        userName={user.name}
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-6 py-8">
        {user.role === "distributor" ? (
          <>
            {/* Header Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Vehicle</h2>
              <p className="text-gray-600">Browse available vehicles and book the right one for your agricultural needs</p>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Filter by Vehicle Type
                  </label>
                  <select
                    value={selectedWeight}
                    onChange={(e) => setSelectedWeight(e.target.value)}
                    className="w-full sm:w-auto px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15B9CC] focus:border-transparent bg-white text-gray-900 font-medium"
                  >
                    <option value="All">All Vehicles</option>
                    <option value="Heavy">Heavy (20+ tons)</option>
                    <option value="Medium">Medium (10-20 tons)</option>
                    <option value="Light">Light (Under 10 tons)</option>
                  </select>
                </div>
                <div className="text-sm text-gray-500">
                  Showing {filteredVehicles.length} vehicles
                </div>
              </div>
            </div>

            {/* Vehicles Grid */}
            <div className="w-3 mx-a px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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
            {/* Header Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Fleet Management</h2>
              <p className="text-gray-600">Monitor your vehicles, bookings, and revenue performance</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <StatsCard title="Total Bookings" value={bookings.length} />
              <StatsCard title="My Vehicles" value={5} color="#f97316" />
              <StatsCard title="Revenue" value="₹2,45,000" color="#22c55e" />
            </div>

            {/* Tables Section */}
            <div className="space-y-8">
              <BookingsTable bookings={bookings} />
              <FleetTable vehicles={vehicleList} />
            </div>
          </>
        )}
      </div>
      </div>
    </PageWrapper>
  );
}
