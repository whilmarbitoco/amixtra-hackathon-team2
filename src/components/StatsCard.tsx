interface StatsCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export default function StatsCard({ title, value, color = "#15B9CC" }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-3xl font-bold" style={{ color }}>{value}</p>
    </div>
  );
}
