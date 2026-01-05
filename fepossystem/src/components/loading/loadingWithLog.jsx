import { Package } from "lucide-react";

export const LoadingWithLogo = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Package className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full animate-ping"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">POS System</h2>
          <p className="text-gray-600">Memuat aplikasi...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-progress"></div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
