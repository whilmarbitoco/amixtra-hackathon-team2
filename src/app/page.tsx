import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import { Truck, DollarSign, Bot, Smartphone } from "lucide-react";

export default function Home() {
  return (
      <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50">

     <PageWrapper>
       <nav className="max-w-7xl mx-auto p-4">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#15B9CC]">
            AgriLogistics
          </Link>

          <div className="space-x-6">
            <Link href="/login" className="text-gray-700 hover:text-[#15B9CC] font-medium">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-[#15B9CC] text-white text-center px-6 py-2.5 rounded-lg hover:bg-[#13a5b7] transition-all duration-300 font-medium"
            >
              Sign Up
            </Link>
          </div>
          </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#15B9CC]/10 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#15B9CC] rounded-full animate-pulse"></span>
            <span className="text-[#15B9CC] font-medium">Revolutionizing Agricultural Logistics</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            AgriLogistics
            <span className="block text-4xl text-[#15B9CC] mt-2">Smart Farm-to-Market Solutions</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect farmers with the perfect logistics vehicles for their agricultural produce. 
            Streamline your supply chain with AI-powered matching, real-time tracking, and transparent pricing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              href="/login"
              className="bg-[#15B9CC] text-white px-10 py-4 rounded-xl hover:bg-[#13a5b7] transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              Start Your Journey
            </Link>
            <Link
              href="/dashboard"
              className="border-2 border-[#15B9CC] text-[#15B9CC] px-10 py-4 rounded-xl hover:bg-[#15B9CC] hover:text-white transition-all duration-300 font-semibold"
            >
              View Dashboard
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#15B9CC]">10K+</div>
              <div className="text-gray-600">Active Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#15B9CC]">5K+</div>
              <div className="text-gray-600">Logistics Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#15B9CC]">98%</div>
              <div className="text-gray-600">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#15B9CC]">₹50Cr+</div>
              <div className="text-gray-600">Transactions</div>
            </div>
          </div>
        </div>

        {/* Vehicle Types */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Choose Your Vehicle Type</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            From small local deliveries to large-scale distribution, we have the right vehicle for every agricultural need.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#15B9CC] to-[#13a5b7] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Heavy Vehicles</h3>
              <p className="text-gray-600 mb-4">Large capacity trucks (20+ tons) for bulk agricultural transport and long-distance distribution</p>
              <div className="text-sm text-[#15B9CC] font-semibold">Perfect for: Grains, Bulk Produce, Export Shipments</div>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#15B9CC] to-[#13a5b7] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Medium Vehicles</h3>
              <p className="text-gray-600 mb-4">Mid-size trucks (5-20 tons) perfect for regional distribution and market supply</p>
              <div className="text-sm text-[#15B9CC] font-semibold">Perfect for: Vegetables, Fruits, Regional Markets</div>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#15B9CC] to-[#13a5b7] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Light Vehicles</h3>
              <p className="text-gray-600 mb-4">Small trucks and vans (up to 5 tons) for local and quick deliveries</p>
              <div className="text-sm text-[#15B9CC] font-semibold">Perfect for: Fresh Produce, Local Markets, Express Delivery</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Why Choose AgriLogistics?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with deep agricultural expertise to deliver unmatched logistics solutions.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">Real-Time Tracking</h4>
              <p className="text-gray-600 text-sm">Monitor your shipments 24/7 with GPS tracking and live updates</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">Transparent Pricing</h4>
              <p className="text-gray-600 text-sm">No hidden fees. Get upfront pricing based on distance and load</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">AI-Powered Matching</h4>
              <p className="text-gray-600 text-sm">Smart algorithms match you with the perfect vehicle and driver</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">Mobile First</h4>
              <p className="text-gray-600 text-sm">Manage everything from your smartphone, anywhere, anytime</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#15B9CC] to-[#13a5b7] rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Agricultural Logistics?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of farmers and logistics partners already using our platform</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/login"
              className="bg-white text-[#15B9CC] px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
            >
              Get Started Today
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-[#15B9CC] transition-colors font-semibold"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
     </PageWrapper>
      </div>
   
  );
}
