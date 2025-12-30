import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
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
  LogOut  
} from "lucide-react";
import { Link } from "react-router";
const items = [
  { label: "Dashboard", href: "/",icon:<LayoutDashboard/> },
  { label: "Transaksi/Kasir", href: "/barang",icon:<ShoppingCart/> },
  { label: "Laporan Transaksi", href: "/barang",icon:<FileText/> },
  { label: "Barang", href: "/barang",icon:<Package/> },
  { label: "Kategori Barang", href: "/barang",icon:<Layers/> },
  { label: "Pengguna", href: "/barang",icon:<Users/> },
]
const AppSidebar = () => {
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center">
            <Store />
            <span className="group-data-[collapsible=icon]:hidden ms-2 text-blue-800 font-semibold">POS System</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>            
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2 mt-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.href} href={item.href}>
                    <SidebarMenuButton asChild>
                      <Link to={item.href} className="flex items-center">
                        {item.icon}
                        <span className="ms-2">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter >
         <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
    <LogOut size={18} />
    <span>Logout</span>
  </button>
        </SidebarFooter>
      </Sidebar>
    );
}
 
export default AppSidebar;