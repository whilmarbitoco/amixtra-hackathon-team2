"use client";

import Link from "next/link";
import { Truck, Building2 } from "lucide-react";

export default function SignupSelection() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <nav className="max-w-7xl mx-auto p-4">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-emerald-600">
            Green Bridge
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

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-4xl mt-7">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-100 px-3 py-1 rounded-full mb-4">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
              <span className="text-emerald-700 font-medium text-xs">AI-Powered Logistics with Blockchain Security</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Green Bridge</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select your account type to get started with blockchain-secured logistics
            </p>
          </div>

        {/* Account Type Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Business Owner Card */}
          <Link href="/signup/business" className="group">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Owner</h3>
                <p className="text-gray-600 mb-6">
                  Ship your goods safely with smart contract protection. Find trusted drivers and track deliveries in real-time.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div>✓ Smart contract escrow protection</div>
                  <div>✓ AI-powered driver matching</div>
                  <div>✓ Real-time shipment tracking</div>
                  <div>✓ Automated payment release</div>
                </div>
                <div className="mt-6 bg-emerald-600 text-white py-3 px-6 rounded-xl font-semibold group-hover:bg-emerald-700 transition-colors">
                  Sign Up as Business
                </div>
              </div>
            </div>
          </Link>

          {/* Driver Card */}
          <Link href="/signup/driver" className="group">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Driver / Vehicle Owner</h3>
                <p className="text-gray-600 mb-6">
                  Earn securely by transporting goods. Get guaranteed payments through blockchain smart contracts.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div>✓ Guaranteed payment protection</div>
                  <div>✓ Browse available shipments</div>
                  <div>✓ Flexible scheduling</div>
                  <div>✓ Instant payment on delivery</div>
                </div>
                <div className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold group-hover:bg-blue-700 transition-colors">
                  Sign Up as Driver
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-4">
          <div>
            <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
              Already have an account? Sign in
            </Link>
          </div>
          <div>
            <Link href="/" className="text-gray-500 hover:text-emerald-600 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>All accounts protected by blockchain smart contracts</span>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}