export const vehicles = [
  { id: 1, type: "Heavy", driver: "John Doe", location: "Warehouse A", status: "Available", capacity: "20 tons", image: "/api/placeholder/300/200", phone: "+1234567890", experience: "5 years", route: "Mumbai - Delhi", time: "24 hours", chargePerKg: 15 },
  { id: 2, type: "Medium", driver: "Jane Smith", location: "Farm District", status: "In Transit", capacity: "10 tons", image: "/api/placeholder/300/200", phone: "+1234567891", experience: "3 years", route: "Pune - Bangalore", time: "18 hours", chargePerKg: 12 },
  { id: 3, type: "Light", driver: "Mike Johnson", location: "City Center", status: "Available", capacity: "3 tons", image: "/api/placeholder/300/200", phone: "+1234567892", experience: "2 years", route: "Chennai - Hyderabad", time: "8 hours", chargePerKg: 18 },
  { id: 4, type: "Heavy", driver: "Sarah Wilson", location: "Port Area", status: "Loading", capacity: "25 tons", image: "/api/placeholder/300/200", phone: "+1234567893", experience: "7 years", route: "Kolkata - Ahmedabad", time: "30 hours", chargePerKg: 14 },
  { id: 5, type: "Medium", driver: "Tom Brown", location: "Rural Route", status: "Available", capacity: "12 tons", image: "/api/placeholder/300/200", phone: "+1234567894", experience: "4 years", route: "Jaipur - Lucknow", time: "12 hours", chargePerKg: 16 },
];

export const commodities = [
  { id: 1, title: "Rice Shipment", from: "Punjab", to: "Kerala", weight: "15 tons", commodity: "Basmati Rice", urgency: "Medium", budget: "₹45,000", contact: "Raj Farms", phone: "+91-9876543210", deadline: "2024-01-20" },
  { id: 2, title: "Wheat Transport", from: "Haryana", to: "Tamil Nadu", weight: "20 tons", commodity: "Wheat Grains", urgency: "High", budget: "₹60,000", contact: "Grain Traders", phone: "+91-9876543211", deadline: "2024-01-18" },
  { id: 3, title: "Vegetable Delivery", from: "Maharashtra", to: "Gujarat", weight: "5 tons", commodity: "Mixed Vegetables", urgency: "High", budget: "₹25,000", contact: "Fresh Produce Co", phone: "+91-9876543212", deadline: "2024-01-16" },
  { id: 4, title: "Fertilizer Transport", from: "Rajasthan", to: "Uttar Pradesh", weight: "30 tons", commodity: "Organic Fertilizer", urgency: "Low", budget: "₹75,000", contact: "AgriSupply Ltd", phone: "+91-9876543213", deadline: "2024-01-25" },
  { id: 5, title: "Seed Distribution", from: "Karnataka", to: "Andhra Pradesh", weight: "8 tons", commodity: "Cotton Seeds", urgency: "Medium", budget: "₹35,000", contact: "Seed Corp", phone: "+91-9876543214", deadline: "2024-01-22" },
];

export const driverRoutes = [
  { id: 1, from: "Warehouse A", to: "Farm District", distance: "45 km", duration: "2h 30m", date: "2024-01-15", status: "Completed" },
  { id: 2, from: "City Center", to: "Port Area", distance: "32 km", duration: "1h 45m", date: "2024-01-14", status: "Completed" },
  { id: 3, from: "Rural Route", to: "Warehouse B", distance: "67 km", duration: "3h 15m", date: "2024-01-13", status: "Completed" },
  { id: 4, from: "Farm District", to: "City Center", distance: "28 km", duration: "1h 20m", date: "2024-01-12", status: "Completed" },
  { id: 5, from: "Port Area", to: "Rural Route", distance: "54 km", duration: "2h 45m", date: "2024-01-11", status: "Completed" },
];

export const businessAnalytics = {
  totalRevenue: 245000,
  totalBookings: 156,
  activeVehicles: 12,
  completedTrips: 89,
  monthlyGrowth: 15.2,
  customerSatisfaction: 4.8
};

export const driverAnalytics = {
  totalTrips: 45,
  totalDistance: 2340,
  totalEarnings: 45600,
  avgRating: 4.7,
  fuelEfficiency: 12.5,
  onTimeDelivery: 94
};