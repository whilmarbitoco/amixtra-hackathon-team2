"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth";
import { log } from "console";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const user = await signIn(email, password);
      
      // Store user data for backward compatibility
      localStorage.setItem("currentUser", JSON.stringify({
        id: user.id,
        name: user.fullname,
        email: user.email,
        role: user.role === "BUSINESS_OWNER" ? "business_owner" : "driver"
      }));

      
      
      if (user.role === "business_owner") {
        router.push("/business/dashboard");
      } else if (user.role === "driver") {
        router.push("/driver/dashboard");
      } else {
        setError("Invalid user role");
        return;
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your secure account</p>
          </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl hover:bg-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Sign In Securely"}
              </button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <div>
                <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                  Need an account? Sign up
                </Link>
              </div>
              <div>
                <Link href="/" className="text-gray-500 hover:text-emerald-600 transition-colors">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
          
          {/* Security Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Protected by blockchain smart contracts</span>
            </div>
          </div>
        </div>
      </div>
  );
}
