interface NavigationProps {
  title: string;
  userName?: string;
  onLogout?: () => void;
}

export default function Navigation({ title, userName, onLogout }: NavigationProps) {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#15B9CC] to-[#13a5b7] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <div className="text-sm text-gray-500">AgriLogistics Platform</div>
            </div>
          </div>
          {userName && onLogout ? (
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-gray-500">Welcome back,</div>
                <div className="font-semibold text-gray-900">{userName}</div>
              </div>
              <button 
                onClick={onLogout} 
                className="bg-gradient-to-r from-[#15B9CC] to-[#13a5b7] text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
