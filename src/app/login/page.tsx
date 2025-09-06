"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/PageWrapper";

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("distributor");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user.role == "distributor") {
        localStorage.setItem("currentUser", JSON.stringify(user));
        router.push("/dashboard/business");

      }
      else if (user.role == "vehicle_owner") {
        localStorage.setItem("currentUser", JSON.stringify(user));
        router.push("/dashboard/driver");
      }
      else if (user.role == "driver"){
        localStorage.setItem("currentUser", JSON.stringify(user));
        router.push("/dashboard/driver");
      } 
      else {
        alert("Invalid credentials");
      }
    } else {
      // Registration logic
      if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const newUser = { name, email, password, role };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      alert("Registration successful!");
      setIsLogin(true);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <PageWrapper showFooter={false}>
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-600">
            {isLogin ? "Sign in to AgriLogistics" : "Join AgriLogistics today"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15B9CC]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15B9CC]"
                >
                  <option value="distributor">Distributor</option>
                  <option value="vehicle_owner">Vehicle Owner</option>
                  <option value="driver">Driver</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15B9CC]"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15B9CC]"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15B9CC]"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#15B9CC] text-white py-2 px-4 rounded-lg hover:bg-[#13a5b7] transition-colors"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#15B9CC] hover:underline"
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
          <div>
            <Link href="/" className="text-gray-500 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      </div>
    </PageWrapper>
  );
}
