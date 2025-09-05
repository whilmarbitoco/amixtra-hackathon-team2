interface VehicleModalProps {
  vehicle: any;
  isOpen: boolean;
  onClose: () => void;
  onBook?: (vehicle: any) => void;
  showBookButton?: boolean;
}

export default function VehicleModal({ vehicle, isOpen, onClose, onBook, showBookButton = false }: VehicleModalProps) {
  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-lg p-6 max-w-md w-full mx-4 transition-all duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Vehicle Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        {vehicle && (
          <>
            <img
              src={vehicle.image}
              alt={`${vehicle.type} vehicle`}
              className="w-full h-48 object-cover rounded-lg mb-4 bg-gray-200"
            />
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Type:</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  vehicle.type === 'Heavy' ? 'bg-red-100 text-red-800' :
                  vehicle.type === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {vehicle.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Driver:</span>
                <span>{vehicle.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phone:</span>
                <span>{vehicle.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Experience:</span>
                <span>{vehicle.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Location:</span>
                <span>{vehicle.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Capacity:</span>
                <span>{vehicle.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                  vehicle.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                  vehicle.status === 'Booked' ? 'bg-purple-100 text-purple-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {vehicle.status}
                </span>
              </div>
            </div>
            {showBookButton && vehicle.status === 'Available' && onBook && (
              <button 
                onClick={() => onBook(vehicle)}
                className="w-full mt-4 bg-[#15B9CC] text-white py-2 px-4 rounded-lg hover:bg-[#13a5b7] transition-colors"
              >
                Book Vehicle
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
