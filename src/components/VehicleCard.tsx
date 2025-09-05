interface VehicleCardProps {
  vehicle: any;
  onClick: (vehicle: any) => void;
}

export default function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  return (
    <div
      onClick={() => onClick(vehicle)}
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
            vehicle.status === 'Booked' ? 'bg-purple-100 text-purple-800' :
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
  );
}
