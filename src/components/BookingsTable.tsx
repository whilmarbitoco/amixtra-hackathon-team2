interface BookingsTableProps {
  bookings: any[];
}

export default function BookingsTable({ bookings }: BookingsTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recent Bookings</h2>
            <p className="text-gray-600 mt-1">Track your latest vehicle bookings and their status</p>
          </div>
          <div className="bg-[#15B9CC] text-white px-4 py-2 rounded-xl font-semibold">
            {bookings.length} Total
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Vehicle Details</th>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Distributor</th>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Booking Date</th>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking, index) => (
              <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#15B9CC] to-[#13a5b7] rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">{booking.driver.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{booking.driver}</div>
                      <div className="text-sm text-gray-500">{booking.vehicleType} Vehicle • {booking.capacity}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div>
                    <div className="text-lg font-medium text-gray-900">{booking.distributorName}</div>
                    <div className="text-sm text-gray-500">{booking.distributorEmail}</div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(booking.bookingDate).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <span className="inline-flex items-center px-4 py-2 text-sm font-bold rounded-full bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <div className="px-8 py-16 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500">Your vehicle bookings will appear here once customers start booking.</p>
          </div>
        )}
      </div>
    </div>
  );
}
