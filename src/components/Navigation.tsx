interface NavigationProps {
  title: string;
  userName?: string;
  onLogout?: () => void;
}

export default function Navigation({ title, userName, onLogout }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {userName && onLogout ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {userName}</span>
            <button onClick={onLogout} className="text-[#15B9CC] hover:underline">
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
