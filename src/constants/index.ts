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
    status: "inactive",
    driverId: "",
    image: "https://wdelivers.com/images/F52099.jpg"
  },
  {
    id: "2",
    make: "Freightliner",
    model: "Cascadia Box Truck",
    year: "2024",
    licensePlate: "BX-002",
    capacity: "25.0",
    vehicleType: "truck",
    status: "inactive",
    driverId: "",
    image: "https://i.ytimg.com/vi/4mvvXjMALPM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBze4DEajYcpj8nbaKXLE_A8MlVyQ"
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
    image: "data:image/jpeg;base64,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",
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