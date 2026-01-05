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
  Box,
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
import { useQueryClient } from "@tanstack/react-query";

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

  const navigate = useNavigate();

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

      {/* Footer */}
      <SidebarFooter className="border-t border-orange-100 bg-orange-50/30 p-3 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <button
                onClick={handleLogout}
                className="flex items-center h-11 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200
                  group-data-[collapsible=icon]:w-11 group-data-[collapsible=icon]:mx-auto
                  group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0
                  px-3 gap-3 group-data-[collapsible=icon]:gap-0 w-full"
              >
                <LogOut size={20} strokeWidth={2} className="flex-shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden text-sm font-medium">
                  Logout
                </span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
