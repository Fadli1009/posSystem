import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  ShoppingCart,
  Mail,
  Lock,
  User,
  Phone,
  Building,
} from "lucide-react";

export default function LoginPages() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel - Branding */}
        <div className="md:w-2/5 bg-gradient-to-br from-orange-500 to-orange-600 p-8 md:p-12 flex flex-col justify-center text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-3 rounded-xl">
                <ShoppingCart className="w-8 h-8 text-orange-500" />
              </div>
              <h1 className="text-3xl font-bold">POS Pro</h1>
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              Solusi Point of Sale Profesional
            </h2>
            <p className="text-orange-100 leading-relaxed">
              Kelola bisnis Anda dengan lebih mudah dan efisien. Sistem POS
              terintegrasi untuk meningkatkan produktivitas dan penjualan.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-orange-400 p-2 rounded-lg mt-1">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Manajemen Inventori</h3>
                <p className="text-orange-100 text-sm">
                  Track stok secara real-time
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-orange-400 p-2 rounded-lg mt-1">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Laporan Lengkap</h3>
                <p className="text-orange-100 text-sm">
                  Analytics dan insights bisnis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="md:w-3/5 p-8 md:p-12">          
         
          {/* Login Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Selamat Datang!
            </h2>
            <p className="text-gray-600 mb-8">
              Silakan login untuk melanjutkan
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                >
                  Lupa password?
                </a>
              </div>

              <button
                onClick={(e) => e.preventDefault()}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
