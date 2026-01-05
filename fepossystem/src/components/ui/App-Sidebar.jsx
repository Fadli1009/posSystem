import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  Store,
  ShoppingCart,
  FileText,
  Package,
  Layers,
  Users,
  LogOut,
} from "lucide-react";

import api from "../../utility/axios";

import { Link, useLocation, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const user = async () => {
  const res = await api.get("/me");
  return res.data;
};
const AppSidebar = () => {
  const items = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Transaksi/Kasir", href: "/transaksi", icon: ShoppingCart },
    {
      label: "Laporan Transaksi",
      href: "/laporan-transaksi",
      icon: FileText,
    },
    { label: "Barang", href: "/barang", icon: Package },
    { label: "Kategori Barang", href: "/kategori-barang", icon: Layers },
    { label: "Pengguna", href: "/pengguna", icon: Users },
  ];
  const { data, isLoading } = useQuery({
    queryFn: user,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      queryClient.clear();
      localStorage.removeItem("token");
      await api.post("/logout");
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/login");
    }
  };

  if (isLoading) {
    return null;
  }
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-orange-100">
      {/* Header */}
      <SidebarHeader className="h-16 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-orange-100/50">
        <div className="flex items-center h-full px-4 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:gap-0">
            <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md">
              <Store className="text-white" size={20} strokeWidth={2.5} />
            </div>
            <div className="group-data-[collapsible=icon]:hidden flex flex-col">
              <span className="text-orange-900 font-bold text-base leading-tight">
                POS System
              </span>
              <span className="text-orange-600 text-xs font-medium">
                Point of Sale
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent className="px-3 py-3 group-data-[collapsible=icon]:px-0">
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild tooltip={item.label}>
                      <Link
                        to={item.href}
                        className={`
                          flex items-center h-11 rounded-lg transition-all duration-200
                          group-data-[collapsible=icon]:w-11 group-data-[collapsible=icon]:mx-auto
                          group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0
                          ${
                            isActive
                              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-200"
                              : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                          }
                          ${!isActive && "px-3 gap-3"}
                          ${
                            isActive &&
                            "px-3 gap-3 group-data-[collapsible=icon]:gap-0"
                          }
                        `}
                      >
                        <Icon
                          size={20}
                          strokeWidth={2}
                          className="flex-shrink-0"
                        />
                        <span className="group-data-[collapsible=icon]:hidden text-sm font-medium truncate">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer - User Profile Card */}
      <SidebarFooter className="border-t border-orange-100 p-3 group-data-[collapsible=icon]:p-2">
        {/* Expanded State - User Profile Card */}
        <div className="group-data-[collapsible=icon]:hidden">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-3">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
              {/* Avatar with Initials */}
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                {data?.merchant.nama_merchant
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "US"}
              </div>

              {/* User Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {data?.merchant?.nama_merchant || "-"}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {data?.name || "User"}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg transition-all duration-200 text-sm font-medium shadow-sm"
            >
              <LogOut size={16} strokeWidth={2} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Collapsed State - Avatar Only - CENTERED */}
        <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
          <button
            onClick={handleLogout}
            title={`${data?.name || "User"} - Click to logout`}
            className="w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-red-500 hover:to-red-600 rounded-full text-white font-bold text-xs shadow-md transition-all duration-200 flex items-center justify-center"
          >
            {data?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "US"}
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
