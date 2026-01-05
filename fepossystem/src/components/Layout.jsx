import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./ui/App-Sidebar";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User, Settings } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../utility/axios";
import { LoadingWithLogo } from "./loading/loadingWithLog";
import { Link } from "react-router";

const user = async () => {
  const res = await api.get("/me");
  return res.data;
};

const Layout = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryFn: user,
  });

  const queryClient = useQueryClient();
  const handleLogout = async () => {
    try {
      queryClient.clear();
      localStorage.removeItem("token");
      await api.post("/logout");
    } catch (error) {
      console.error(error);
      // alert("gagal logout");
    } finally {
      navigate("/login");
    }
  };

  const getUserInitials = (name) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  if (isLoading) {
    return <LoadingWithLogo />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Left: Sidebar Trigger */}
              <SidebarTrigger />

              {/* Right: User Profile */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {getUserInitials(data.name)}
                  </div>

                  {/* User Info */}
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {data.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {data.role.nama_role}
                    </p>
                  </div>

                  {/* Dropdown Icon */}
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button
                      onClick={() => {
                        console.log("Profile clicked");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User size={16} />
                      <Link to={"/profil-pengguna"}>
                        <span>Profile</span>
                      </Link>
                    </button>

                    <button
                      onClick={() => {
                        console.log("Settings clicked");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings size={16} />
                      <span>Pengaturan</span>
                    </button>

                    <div className="my-1 border-t border-gray-100"></div>

                    <button
                      onClick={() => handleLogout()}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <section className="p-5">{children}</section>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
