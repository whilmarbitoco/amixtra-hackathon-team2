import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#15B9CC]">AgriLogistics</h3>
            <p className="text-gray-300 text-sm">
              Connecting farmers with smart logistics solutions for efficient agricultural supply chains.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/login" className="block text-gray-300 hover:text-[#15B9CC] text-sm">
                Login
              </Link>
              <Link href="/dashboard" className="block text-gray-300 hover:text-[#15B9CC] text-sm">
                Dashboard
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail size={16} />
                <span>info@agrilogistics.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin size={16} />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 AgriLogistics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}