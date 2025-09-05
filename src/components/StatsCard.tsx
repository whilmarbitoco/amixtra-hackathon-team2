interface StatsCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export default function StatsCard({ title, value, color = "#15B9CC" }: StatsCardProps) {
  const getGradient = (color: string) => {
    switch (color) {
      case "#f97316":
        return "from-orange-500 to-orange-600";
      case "#22c55e":
        return "from-green-500 to-green-600";
      default:
        return "from-[#15B9CC] to-[#13a5b7]";
    }
  };

  const getIcon = (title: string) => {
    if (title.includes("Bookings")) return "📋";
    if (title.includes("Vehicles")) return "🚛";
    if (title.includes("Revenue")) return "💰";
    return "📊";
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className={`h-2 bg-gradient-to-r ${getGradient(color)}`}></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl">{getIcon(title)}</div>
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getGradient(color)} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
        <p className="text-4xl font-bold text-gray-900 mb-1">{value}</p>
        <div className="flex items-center gap-1 text-sm text-green-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span>+12% from last month</span>
        </div>
      </div>
    </div>
  );
}
