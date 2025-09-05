import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            AgriLogistics
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with the right logistics vehicles for your agricultural produce
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="bg-[#15B9CC] text-white px-8 py-3 rounded-lg hover:bg-[#13a5b7] transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="border border-[#15B9CC] text-[#15B9CC] px-8 py-3 rounded-lg hover:bg-[#15B9CC] hover:text-white transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-[#15B9CC] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Heavy Vehicles</h3>
            <p className="text-gray-600">Large capacity trucks for bulk agricultural transport</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-[#15B9CC] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Medium Vehicles</h3>
            <p className="text-gray-600">Mid-size trucks perfect for regional distribution</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-[#15B9CC] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Light Vehicles</h3>
            <p className="text-gray-600">Small trucks for local and quick deliveries</p>
          </div>
        </div>
      </div>
    </div>
  );
}
