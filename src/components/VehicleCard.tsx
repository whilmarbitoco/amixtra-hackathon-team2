interface VehicleCardProps {
  vehicle: any;
  onClick: (vehicle: any) => void;
}

export default function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  return (
    <div
      onClick={() => onClick(vehicle)}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
    >
      <div className="relative">
        <img
          src={vehicle.image}
          alt={`${vehicle.type} vehicle`}
          className="w-full h-48 object-cover bg-gradient-to-br from-gray-200 to-gray-300"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md ${
            vehicle.type === 'Heavy' ? 'bg-red-500/90 text-white' :
            vehicle.type === 'Medium' ? 'bg-orange-500/90 text-white' :
            'bg-green-500/90 text-white'
          }`}>
            {vehicle.type}
          </span>
          <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md ${
            vehicle.status === 'Available' ? 'bg-green-500/90 text-white' :
            vehicle.status === 'In Transit' ? 'bg-blue-500/90 text-white' :
            vehicle.status === 'Booked' ? 'bg-purple-500/90 text-white' :
            'bg-yellow-500/90 text-white'
          }`}>
            {vehicle.status}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#15B9CC] to-[#13a5b7] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{vehicle.driver.charAt(0)}</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{vehicle.driver}</h3>
            <p className="text-sm text-gray-500">{vehicle.experience} experience</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-gray-600">{vehicle.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-.293-.707L15 4.586A1 1 0 0014.414 4H14v3z" />
            </svg>
            <p className="text-sm font-semibold text-[#15B9CC]">{vehicle.capacity}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="w-full text-[#15B9CC] font-semibold text-sm group-hover:text-white group-hover:bg-[#15B9CC] py-2 rounded-lg transition-all duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
