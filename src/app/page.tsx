import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import { Truck, DollarSign, Bot, Shield, Zap, Lock, Check, Star, Users, BarChart3, TrendingUp, CreditCard, MapPin, Target } from "lucide-react";

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
            <span className="text-emerald-700 font-medium text-xs">₱40M Market Opportunity • Davao's #1 Logistics Platform</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Green Bridge
            <span className="block text-3xl text-emerald-600 mt-2">Davao's Smart Contract Logistics Platform</span>
          </h1>
          <p className="text-md text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            The Philippines' first blockchain-secured logistics marketplace, exclusively serving Davao Region. 
            Connect agricultural businesses with trusted drivers through AI-powered matching and smart contract escrow. 
            <strong>Join 5,000+ businesses in our ₱800M regional market.</strong>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              href="/login"
              className="bg-emerald-600 text-white px-10 py-4 rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              Start Shipping Securely
            </Link>
            <Link
              href="#pricing"
              className="border-2 border-emerald-600 text-emerald-600 px-10 py-4 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 font-semibold"
            >
              View Pricing
            </Link>
          </div>
          
          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">₱800M</div>
              <div className="text-gray-600">Davao Market Size</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">5%</div>
              <div className="text-gray-600">Target Market Share</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">₱40M</div>
              <div className="text-gray-600">3-Year Revenue Goal</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">5-8%</div>
              <div className="text-gray-600">Commission Rate</div>
            </div>
          </div>
        </div>

        {/* Why Davao Region */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Why We Focus on Davao Region</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Davao Region is the Philippines' agricultural powerhouse with ₱800M in logistics spending annually. 
            We're the first blockchain logistics platform serving this underserved but lucrative market.
          </p>
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl shadow-lg p-8 max-w-5xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Strategic Location</h4>
                <p className="text-gray-700 mb-3">Covers Davao City, Tagum, Digos, Panabo - the economic centers of Mindanao</p>
                <div className="text-2xl font-bold text-emerald-600">5.2M People</div>
                <div className="text-sm text-gray-600">Largest regional economy outside Metro Manila</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Agricultural Powerhouse</h4>
                <p className="text-gray-700 mb-3">Philippines' top producer of bananas, durian, coconut, rice, and coffee</p>
                <div className="text-2xl font-bold text-blue-600">₱320M</div>
                <div className="text-sm text-gray-600">Annual agricultural logistics market</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Market Opportunity</h4>
                <p className="text-gray-700 mb-3">Underserved market with no blockchain logistics platform until now</p>
                <div className="text-2xl font-bold text-purple-600">First Mover</div>
                <div className="text-sm text-gray-600">Capturing 3.7% market share already</div>
              </div>
            </div>
          </div>
       
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">How Green Bridge Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Simple 4-step process powered by blockchain security and AI optimization
          </p>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Post Your Shipment</h4>
              <p className="text-gray-600">Businesses post their cargo details, pickup/delivery locations, and requirements on our platform</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">AI Matches Drivers</h4>
              <p className="text-gray-600">Our AI algorithm matches your shipment with the best available drivers based on route, capacity, and ratings</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Smart Contract Escrow</h4>
              <p className="text-gray-600">Payment is secured in blockchain escrow until delivery is confirmed via GPS and digital signatures</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">4</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Automatic Payment</h4>
              <p className="text-gray-600">Upon successful delivery confirmation, payment is automatically released to the driver</p>
            </div>
          </div>
        </div>
        
        {/* Pricing Section */}
        <div id="pricing" className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Transparent Pricing for Davao Market</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Competitive rates designed for Davao's agricultural and commercial logistics needs. All plans include blockchain security, AI matching, and local support.
          </p>
          
          {/* Business Plans */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">For Davao Businesses</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Basic</h4>
                  <div className="text-3xl font-bold text-emerald-600 mb-1">₱2,999</div>
                  <div className="text-gray-600 text-sm">per month</div>
                  <div className="text-xs text-gray-700 mt-1">Perfect for small farms</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">10 shipments/month</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">Basic GPS tracking</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">Smart contract escrow</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">Bisaya/English support</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">Agricultural commodity focus</span></li>
                </ul>
                <Link href="/signup/business" className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-center block">
                  Start Basic Plan
                </Link>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-emerald-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Professional</h4>
                  <div className="text-3xl font-bold text-emerald-600 mb-1">₱7,999</div>
                  <div className="text-gray-600 text-sm">per month</div>
                  <div className="text-xs text-gray-700 mt-1">Ideal for distributors</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">50 shipments/month</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">AI analytics dashboard</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">Priority driver matching</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">Davao route optimization</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">24/7 phone support</span></li>
                </ul>
                <Link href="/signup/business" className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-center block">
                  Start Professional
                </Link>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h4>
                  <div className="text-3xl font-bold text-emerald-600 mb-1">₱19,999</div>
                  <div className="text-gray-600 text-sm">per month</div>
                  <div className="text-xs text-gray-700 mt-1">For large agri-corps</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">Unlimited shipments</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">Dedicated account manager</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">Custom integrations</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">Market intelligence reports</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-sm text-gray-800">White-label solutions</span></li>
                </ul>
                <Link href="/signup/business" className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-center block">
                  Start Enterprise
                </Link>
              </div>
            </div>
          </div>
          
          {/* Driver Plans */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">For Davao Drivers</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Standard</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-1">₱999</div>
                  <div className="text-gray-600 text-sm">per month</div>
                  <div className="text-xs text-gray-700 mt-1">For individual drivers</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /><span className="text-sm text-gray-800">20 jobs/month</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /><span className="text-sm text-gray-800">Basic route planning</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /><span className="text-sm text-gray-800">Payment protection</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /><span className="text-sm text-gray-800">Davao traffic updates</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /><span className="text-sm text-gray-800">Mobile app access</span></li>
                </ul>
                <Link href="/signup/driver" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center block">
                  Start Standard
                </Link>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-500">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Pro</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-1">₱2,499</div>
                  <div className="text-gray-600 text-sm">per month</div>
                  <div className="text-xs text-gray-700 mt-1">For fleet operators</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /><span className="text-sm text-gray-800">Unlimited jobs</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /><span className="text-sm text-gray-800">Advanced AI routing</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /><span className="text-sm text-gray-800">Priority job matching</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /><span className="text-sm text-gray-800">Fuel optimization</span></li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /><span className="text-sm text-gray-800">Earnings analytics</span></li>
                </ul>
                <Link href="/signup/driver" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center block">
                  Start Pro
                </Link>
              </div>
            </div>
          </div>
          
          {/* Commission Structure */}
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Commission Structure</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Transaction Fee</h4>
                <div className="text-2xl font-bold text-emerald-600 mb-2">5-8%</div>
                <p className="text-gray-800 text-sm">Per completed shipment (3-5% business, 2-3% driver)</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Escrow Fee</h4>
                <div className="text-2xl font-bold text-blue-600 mb-2">1-2%</div>
                <p className="text-gray-800 text-sm">For blockchain security & smart contract processing</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Payment Processing</h4>
                <div className="text-2xl font-bold text-purple-600 mb-2">2.5%</div>
                <p className="text-gray-800 text-sm">For instant settlements & crypto payments</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Value-Added Services */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Premium Services for Davao Market</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Specialized services designed for Davao's agricultural and commercial logistics needs.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h4 className="font-bold text-lg mb-2 text-gray-900">Cargo Insurance</h4>
              <p className="text-gray-800 text-sm mb-3">Specialized for agricultural goods</p>
              <div className="text-emerald-600 font-semibold">₱500-2,000/policy</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-bold text-lg mb-2 text-gray-900">Route Optimization</h4>
              <p className="text-gray-800 text-sm mb-3">Davao traffic & weather aware</p>
              <div className="text-blue-600 font-semibold">₱500-1,000/route</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h4 className="font-bold text-lg mb-2 text-gray-900">Market Intelligence</h4>
              <p className="text-gray-800 text-sm mb-3">Davao commodity pricing data</p>
              <div className="text-purple-600 font-semibold">₱15K-50K/month</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h4 className="font-bold text-lg mb-2 text-gray-900">Priority Support</h4>
              <p className="text-gray-800 text-sm mb-3">24/7 local Davao team</p>
              <div className="text-orange-600 font-semibold">₱1,999/month</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Join Davao's ₱40M Logistics Revolution</h2>
          <p className="text-xl mb-8 opacity-90">Be part of the ₱800M market opportunity with proven 12.5% monthly growth</p>
          <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">₱35M</div>
              <div className="text-sm opacity-90">Year 1 Revenue Target</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">5%</div>
              <div className="text-sm opacity-90">Market Share Goal</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">3,000+</div>
              <div className="text-sm opacity-90">Target Users</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="bg-white text-emerald-600 px-8 text-center py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
            >
              Start Earning Today
            </Link>
            <Link
              href="#pricing"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-emerald-600 transition-colors font-semibold"
            >
              View All Plans
            </Link>
          </div>
        </div>
      </div>
     </PageWrapper>
     
     {/* Footer */}
     <footer className="bg-gray-900 text-white">
       <div className="max-w-7xl mx-auto px-4 py-16">
         <div className="grid md:grid-cols-4 gap-8">
           {/* Company Info */}
           <div className="md:col-span-1">
             <div className="flex items-center mb-4">
               <img src="/gb-logo.png" alt="Green Bridge" className="w-8 h-8 mr-2" />
               <span className="text-xl font-bold">Green Bridge</span>
             </div>
             <p className="text-gray-400 mb-4">
               Davao's first blockchain-secured logistics platform connecting businesses with trusted drivers.
             </p>
             <div className="text-sm text-gray-400">
               <p>Serving Davao Region</p>
               <p>5.2M+ Population</p>
               <p>₱800M Market Opportunity</p>
             </div>
           </div>
           
           {/* Services */}
           <div>
             <h4 className="text-lg font-semibold mb-4">Services</h4>
             <ul className="space-y-2 text-gray-400">
               <li><Link href="#" className="hover:text-white transition-colors">Smart Contract Escrow</Link></li>
               <li><Link href="#" className="hover:text-white transition-colors">AI Driver Matching</Link></li>
               <li><Link href="#" className="hover:text-white transition-colors">Real-time Tracking</Link></li>
               <li><Link href="#" className="hover:text-white transition-colors">Route Optimization</Link></li>
               <li><Link href="#" className="hover:text-white transition-colors">Cargo Insurance</Link></li>
             </ul>
           </div>
           
           {/* Pricing */}
           <div>
             <h4 className="text-lg font-semibold mb-4">Pricing</h4>
             <ul className="space-y-2 text-gray-400">
               <li><Link href="#pricing" className="hover:text-white transition-colors">Business Plans</Link></li>
               <li><Link href="#pricing" className="hover:text-white transition-colors">Driver Plans</Link></li>
               <li><Link href="#pricing" className="hover:text-white transition-colors">Commission Structure</Link></li>
               <li><Link href="#pricing" className="hover:text-white transition-colors">Premium Services</Link></li>
               <li><Link href="#" className="hover:text-white transition-colors">Enterprise Solutions</Link></li>
             </ul>
           </div>
           
           {/* Company */}
           <div>
             <h4 className="text-lg font-semibold mb-4">Company</h4>
             <ul className="space-y-2 text-gray-400">
               <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
               <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
               <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
               <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
               <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
             </ul>
           </div>
         </div>
         
         {/* Market Stats */}
         <div className="border-t border-gray-800 mt-12 pt-8">
           <div className="grid md:grid-cols-4 gap-6 mb-8">
             <div className="text-center">
               <div className="text-2xl font-bold text-emerald-400">₱800M</div>
               <div className="text-sm text-gray-400">Davao Logistics Market</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-blue-400">5%</div>
               <div className="text-sm text-gray-400">Target Market Share</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-purple-400">₱40M</div>
               <div className="text-sm text-gray-400">3-Year Revenue Goal</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-orange-400">12.5%</div>
               <div className="text-sm text-gray-400">Monthly Growth Rate</div>
             </div>
           </div>
         </div>
         
         {/* Bottom */}
         <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
           <div className="text-gray-400 text-sm mb-4 md:mb-0">
             © 2024 Green Bridge. All rights reserved. Serving Davao Region with blockchain-secured logistics.
           </div>
           <div className="flex space-x-6 text-sm text-gray-400">
             <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
             <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
           </div>
         </div>
       </div>
     </footer>
      </div>
   
  );
}
