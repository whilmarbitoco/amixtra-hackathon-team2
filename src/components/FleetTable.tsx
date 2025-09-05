interface FleetTableProps {
  vehicles: any[];
  title?: string;
}

export default function FleetTable({ vehicles, title = "My Fleet" }: FleetTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500/90 text-white';
      case 'In Transit':
        return 'bg-blue-500/90 text-white';
      case 'Booked':
        return 'bg-purple-500/90 text-white';
      default:
        return 'bg-yellow-500/90 text-white';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Heavy':
        return 'bg-red-500/90 text-white';
      case 'Medium':
        return 'bg-orange-500/90 text-white';
      default:
        return 'bg-green-500/90 text-white';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-1">Manage and monitor your vehicle fleet</p>
          </div>
          <div className="bg-[#15B9CC] text-white px-4 py-2 rounded-xl font-semibold">
            {vehicles.length} Vehicles
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Vehicle Type</th>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Driver</th>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Location</th>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Capacity</th>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6 whitespace-nowrap">
                  <span className={`inline-flex items-center px-4 py-2 text-sm font-bold rounded-full ${getTypeColor(vehicle.type)}`}>
                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                    {vehicle.type}
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#15B9CC] to-[#13a5b7] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{vehicle.driver.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{vehicle.driver}</div>
                      <div className="text-sm text-gray-500">{vehicle.experience} experience</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">{vehicle.location}</span>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-.293-.707L15 4.586A1 1 0 0014.414 4H14v3z" />
                    </svg>
                    <span className="text-sm font-semibold text-[#15B9CC]">{vehicle.capacity}</span>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <span className={`inline-flex items-center px-4 py-2 text-sm font-bold rounded-full ${getStatusColor(vehicle.status)}`}>
                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                    {vehicle.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
