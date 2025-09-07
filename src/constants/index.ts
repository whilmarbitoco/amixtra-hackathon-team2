export interface Commodity {
  id: string;
  name: string;
  status: 'in-transit' | 'delivered' | 'delayed' | 'pending';
  currentLocation: { lat: number; lng: number };
  destination: { lat: number; lng: number; address: string };
  estimatedArrival: Date;
  driver: string;
  lastUpdate: Date;
}

export interface TrackingMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'alert' | 'status';
}

export const mockCommodities: Commodity[] = [
  {
    id: 'COM001',
    name: 'Rice Shipment - 50 tons',
    status: 'in-transit',
    currentLocation: { lat: 7.0731, lng: 125.6128 },
    destination: { lat: 7.2906, lng: 125.6800, address: 'Tagum City, Davao del Norte' },
    estimatedArrival: new Date(Date.now() + 2 * 60 * 60 * 1000),
    driver: 'Juan Dela Cruz',
    lastUpdate: new Date()
  },
  {
    id: 'COM002',
    name: 'Banana Export - 100 boxes',
    status: 'delivered',
    currentLocation: { lat: 7.1907, lng: 125.4553 },
    destination: { lat: 7.1907, lng: 125.4553, address: 'Digos City, Davao del Sur' },
    estimatedArrival: new Date(Date.now() - 1 * 60 * 60 * 1000),
    driver: 'Maria Santos',
    lastUpdate: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: 'COM003',
    name: 'Coconut Oil - 200 liters',
    status: 'delayed',
    currentLocation: { lat: 7.1500, lng: 125.5000 },
    destination: { lat: 7.3500, lng: 125.7000, address: 'Panabo City, Davao del Norte' },
    estimatedArrival: new Date(Date.now() + 4 * 60 * 60 * 1000),
    driver: 'Pedro Gonzales',
    lastUpdate: new Date(Date.now() - 15 * 60 * 1000)
  },
  {
    id: 'COM004',
    name: 'Durian Fruits - 80 boxes',
    status: 'pending',
    currentLocation: { lat: 7.0600, lng: 125.6000 },
    destination: { lat: 6.9000, lng: 125.3000, address: 'General Santos City' },
    estimatedArrival: new Date(Date.now() + 6 * 60 * 60 * 1000),
    driver: 'Ana Reyes',
    lastUpdate: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: 'COM005',
    name: 'Coffee Beans - 30 sacks',
    status: 'in-transit',
    currentLocation: { lat: 7.2000, lng: 125.4500 },
    destination: { lat: 7.4000, lng: 125.8000, address: 'Mati City, Davao Oriental' },
    estimatedArrival: new Date(Date.now() + 3 * 60 * 60 * 1000),
    driver: 'Roberto Cruz',
    lastUpdate: new Date(Date.now() - 2 * 60 * 1000)
  },
  {
    id: 'COM006',
    name: 'Pineapple Cans - 500 units',
    status: 'in-transit',
    currentLocation: { lat: 7.1200, lng: 125.6500 },
    destination: { lat: 6.7500, lng: 125.2000, address: 'Koronadal City, South Cotabato' },
    estimatedArrival: new Date(Date.now() + 5 * 60 * 60 * 1000),
    driver: 'Carmen Lopez',
    lastUpdate: new Date(Date.now() - 8 * 60 * 1000)
  }
];

export const mockTrackingMessages: TrackingMessage[] = [
  {
    id: '1',
    user: 'System',
    message: '📦 Location update for Rice Shipment - 50 tons',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    type: 'status'
  },
  {
    id: '2',
    user: 'Juan Dela Cruz',
    message: 'Traffic delay on highway, ETA updated',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: 'message'
  },
  {
    id: '3',
    user: 'System',
    message: '⚠️ Delay Alert reported for Coconut Oil shipment',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    type: 'alert'
  }
];

export const businessAnalytics = {
  totalRevenue: 2450000,
  monthlyGrowth: 12.5,
  totalBookings: 156,
  activeVehicles: 24
};

export interface Vehicle {
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

export const heavyDutyVehicles: Vehicle[] = [
  {
    id: "1",
    make: "Peterbilt",
    model: "579 Semi-Trailer",
    year: "2023",
    licensePlate: "18W-001",
    capacity: "40.0",
    vehicleType: "truck",
    status: "active",
    driverId: "",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400"
  },
  {
    id: "2",
    make: "Caterpillar",
    model: "773G Dump Truck",
    year: "2022",
    licensePlate: "DMP-002",
    capacity: "45.0",
    vehicleType: "truck",
    status: "active",
    driverId: "",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
  },
  {
    id: "3",
    make: "Mack",
    model: "Granite Flatbed",
    year: "2021",
    licensePlate: "FLT-003",
    capacity: "25.0",
    vehicleType: "truck",
    status: "active",
    driverId: "",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
  },
  {
    id: "4",
    make: "Kenworth",
    model: "T880 Lowboy Trailer",
    year: "2023",
    licensePlate: "LOW-004",
    capacity: "80.0",
    vehicleType: "trailer",
    status: "active",
    driverId: "",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
  },
  {
    id: "5",
    make: "Volvo",
    model: "A60H Articulated Dump",
    year: "2022",
    licensePlate: "ADT-005",
    capacity: "55.0",
    vehicleType: "truck",
    status: "inactive",
    driverId: "",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
  },
  {
    id: "6",
    make: "Freightliner",
    model: "M2 Tank Truck",
    year: "2021",
    licensePlate: "TNK-006",
    capacity: "30.0",
    vehicleType: "truck",
    status: "active",
    driverId: "",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
  }
];

export const vehicles = [
  { id: 1, type: 'Truck', status: 'Available', capacity: '10 tons' },
  { id: 2, type: 'Van', status: 'In Transit', capacity: '2 tons' },
  { id: 3, type: 'Truck', status: 'Available', capacity: '15 tons' },
  { id: 4, type: 'Van', status: 'Maintenance', capacity: '3 tons' },
  { id: 5, type: 'Truck', status: 'In Transit', capacity: '12 tons' },
  { id: 6, type: 'Van', status: 'Available', capacity: '2.5 tons' }
];

export const driverAnalytics = {
  totalTrips: 142,
  totalDistance: 8450,
  totalEarnings: 125000
};

export const driverRoutes = [
  {
    id: 1,
    from: 'Davao City',
    to: 'Tagum City',
    distance: '65 km',
    duration: '1h 30m',
    status: 'Completed',
    date: '2024-01-15'
  },
  {
    id: 2,
    from: 'Panabo City',
    to: 'Digos City',
    distance: '85 km',
    duration: '2h 15m',
    status: 'Completed',
    date: '2024-01-14'
  },
  {
    id: 3,
    from: 'Mati City',
    to: 'General Santos',
    distance: '120 km',
    duration: '3h 45m',
    status: 'Completed',
    date: '2024-01-13'
  }
];

export const commodities = [
  {
    id: 1,
    title: 'Rice Transport - Urgent',
    commodity: 'Premium Rice',
    from: 'Davao City',
    to: 'Tagum City',
    weight: '50 tons',
    budget: '₱25,000',
    deadline: 'Jan 20, 2024',
    contact: 'Juan Santos',
    phone: '+63 912 345 6789',
    urgency: 'High'
  },
  {
    id: 2,
    title: 'Banana Export Delivery',
    commodity: 'Fresh Bananas',
    from: 'Panabo City',
    to: 'Digos City',
    weight: '30 tons',
    budget: '₱18,000',
    deadline: 'Jan 25, 2024',
    contact: 'Maria Cruz',
    phone: '+63 923 456 7890',
    urgency: 'Medium'
  },
  {
    id: 3,
    title: 'Coconut Oil Transport',
    commodity: 'Virgin Coconut Oil',
    from: 'Mati City',
    to: 'General Santos',
    weight: '15 tons',
    budget: '₱12,000',
    deadline: 'Feb 1, 2024',
    contact: 'Pedro Reyes',
    phone: '+63 934 567 8901',
    urgency: 'Low'
  },
  {
    id: 4,
    title: 'Durian Fruit Delivery',
    commodity: 'Fresh Durian',
    from: 'Davao City',
    to: 'Koronadal City',
    weight: '20 tons',
    budget: '₱22,000',
    deadline: 'Jan 18, 2024',
    contact: 'Ana Lopez',
    phone: '+63 945 678 9012',
    urgency: 'High'
  },
  {
    id: 5,
    title: 'Coffee Bean Transport',
    commodity: 'Arabica Coffee Beans',
    from: 'Bukidnon',
    to: 'Davao City',
    weight: '10 tons',
    budget: '₱15,000',
    deadline: 'Jan 30, 2024',
    contact: 'Roberto Garcia',
    phone: '+63 956 789 0123',
    urgency: 'Medium'
  },
  {
    id: 6,
    title: 'Pineapple Delivery',
    commodity: 'Sweet Pineapples',
    from: 'Bukidnon',
    to: 'Cagayan de Oro',
    weight: '25 tons',
    budget: '₱20,000',
    deadline: 'Feb 5, 2024',
    contact: 'Carmen Dela Cruz',
    phone: '+63 967 890 1234',
    urgency: 'Low'
  }
];

export const sampleBookings = [
  {
    id: '1',
    distributorName: 'ABC Distribution',
    distributorEmail: 'contact@abc.com',
    status: 'Confirmed',
    vehicleType: 'Truck Driver',
    capacity: '10 tons',
    bookingDate: new Date().toISOString()
  },
  {
    id: '2',
    distributorName: 'XYZ Logistics',
    distributorEmail: 'info@xyz.com',
    status: 'Pending',
    vehicleType: 'Van Driver',
    capacity: '5 tons',
    bookingDate: new Date().toISOString()
  }
];

export const mockTransportedCommodities = [
  { name: "Rice", quantity: "50 sacks", weight: "2,500 kg" },
  { name: "Corn", quantity: "30 sacks", weight: "1,500 kg" },
  { name: "Vegetables", quantity: "20 boxes", weight: "800 kg" }
];

export const chatMessages = {
  driver: [
    {id: '1', text: 'Hello! I\'m your driving assistant. How can I help you today?', isBot: true}
  ],
  business: [
    {id: '1', text: 'Hello! I\'m your shipping assistant. I can help you find drivers, track shipments, and manage your logistics.', isBot: true}
  ]
};

export interface BusinessShipment {
  id: string;
  distributorName: string;
  distributorEmail: string;
  vehicleType: string;
  capacity: string;
  bookingDate: string;
  status: string;
  pickupLocation: string;
  deliveryLocation: string;
  commodityType: string;
  weight: string;
  estimatedCost: number;
}

export const sampleBusinessShipments: BusinessShipment[] = [
  {
    id: "1",
    distributorName: "Fresh Market Co.",
    distributorEmail: "orders@freshmarket.com",
    vehicleType: "Refrigerated Truck",
    capacity: "5 tons",
    bookingDate: new Date(Date.now() - 86400000).toISOString(),
    status: "Confirmed",
    pickupLocation: "Farm A, Laguna",
    deliveryLocation: "Metro Manila",
    commodityType: "Fresh Vegetables",
    weight: "4.5 tons",
    estimatedCost: 3500
  },
  {
    id: "2",
    distributorName: "City Grocers",
    distributorEmail: "supply@citygrocers.com",
    vehicleType: "Standard Truck",
    capacity: "3 tons",
    bookingDate: new Date(Date.now() - 172800000).toISOString(),
    status: "In Transit",
    pickupLocation: "Farm B, Batangas",
    deliveryLocation: "Quezon City",
    commodityType: "Rice",
    weight: "2.8 tons",
    estimatedCost: 2800
  },
  {
    id: "3",
    distributorName: "Organic Foods Ltd.",
    distributorEmail: "logistics@organicfoods.com",
    vehicleType: "Van",
    capacity: "1.5 tons",
    bookingDate: new Date(Date.now() - 259200000).toISOString(),
    status: "Delivered",
    pickupLocation: "Farm C, Cavite",
    deliveryLocation: "Makati",
    commodityType: "Organic Fruits",
    weight: "1.2 tons",
    estimatedCost: 1800
  },
  {
    id: "4",
    distributorName: "Wholesale Market",
    distributorEmail: "orders@wholesale.com",
    vehicleType: "Large Truck",
    capacity: "8 tons",
    bookingDate: new Date(Date.now() - 345600000).toISOString(),
    status: "Pending",
    pickupLocation: "Farm D, Nueva Ecija",
    deliveryLocation: "Pasig",
    commodityType: "Corn",
    weight: "7.5 tons",
    estimatedCost: 4200
  }
];