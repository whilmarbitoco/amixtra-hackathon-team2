import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import { Truck, DollarSign, Bot, Shield, Zap, Lock } from "lucide-react";

export default function Home() {
  return (
      <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50">

     <PageWrapper>
       <nav className="max-w-7xl mx-auto">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-emerald-600">
            <div className="p-6 flex items-center justify-center">
              <img src="/gb-logo.png" alt="Logo" className="w-4/12" />
            </div>          
        </Link>

          <div className="space-x-6">
            <Link href="/login" className="text-gray-700 hover:text-emerald-600 font-medium">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-emerald-600 text-white text-center px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-all duration-300 font-medium"
            >
              Sign Up
            </Link>
          </div>
          </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
            <span className="text-emerald-700 font-medium text-xs">AI-Powered Logistics with Blockchain Security</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Green Bridge
            <span className="block text-3xl text-emerald-600 mt-2">Smart Contract Logistics Platform</span>
          </h1>
          <p className="text-md text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect businesses with trusted drivers using AI-powered matching and blockchain-secured smart contracts. 
            Safe, transparent, and automated escrow payments ensure protection for both parties.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              href="/login"
              className="bg-emerald-600 text-white px-10 py-4 rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              Start Shipping Securely
            </Link>
            <Link
              href="/signup"
              className="border-2 border-emerald-600 text-emerald-600 px-10 py-4 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 font-semibold"
            >
              Register Now
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">5K+</div>
              <div className="text-gray-600">Active Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">3K+</div>
              <div className="text-gray-600">Verified Drivers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">100%</div>
              <div className="text-gray-600">Secure Payments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">₱25M+</div>
              <div className="text-gray-600">Escrowed Safely</div>
            </div>
          </div>
        </div>

        {/* Vehicle Types */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Smart Contract Protected Shipping</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Every shipment is protected by blockchain smart contracts. Payments are held in escrow and released automatically upon delivery confirmation.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Smart Contract Escrow</h3>
              <p className="text-gray-600 mb-4">Blockchain-secured payments held in escrow until delivery confirmation. Zero risk for both parties.</p>
              <div className="text-sm text-emerald-600 font-semibold">Protected by: Ethereum Smart Contracts</div>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">AI-Powered Matching</h3>
              <p className="text-gray-600 mb-4">Advanced algorithms match businesses with optimal drivers based on route, capacity, and reliability scores.</p>
              <div className="text-sm text-emerald-600 font-semibold">Powered by: Machine Learning & Big Data</div>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Automated Protection</h3>
              <p className="text-gray-600 mb-4">Real-time GPS tracking, delivery confirmation, and automatic payment release upon successful delivery.</p>
              <div className="text-sm text-emerald-600 font-semibold">Features: GPS Tracking, Auto-Release, Dispute Resolution</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Why Choose Green Bridge?</h2>
          <p className="text-center text-black mb-12 max-w-2xl mx-auto">
            The first logistics platform combining AI-powered matching with blockchain-secured smart contracts for complete transaction protection.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16  bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-black/80">Blockchain Security</h4>
              <p className="text-gray-600 text-sm">Smart contracts ensure payments are secure and automatically released</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-black/80">Escrow Protection</h4>
              <p className="text-gray-600 text-sm">Funds held safely until delivery confirmation protects both parties</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-black/80">AI Optimization</h4>
              <p className="text-gray-600 text-sm">Machine learning matches optimal routes and reliable drivers</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-black/80">Instant Settlements</h4>
              <p className="text-gray-600 text-sm">Automated payment release upon GPS-confirmed delivery</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready for Secure, AI-Powered Logistics?</h2>
          <p className="text-xl mb-8 opacity-90">Join businesses and drivers using blockchain-protected smart contracts</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/login"
              className="bg-white text-emerald-600 px-8 text-center py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
            >
              Start Shipping Safely
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-emerald-600 transition-colors font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
     </PageWrapper>
      </div>
   
  );
}
