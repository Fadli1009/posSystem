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
import { Box, LayoutDashboard, Store } from "lucide-react";
import { Link } from "react-router";
const items = [
  { label: "Dashboard", href: "/",icon:<LayoutDashboard/> },
  { label: "Items", href: "/barang",icon:<Box/> },
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
        <SidebarFooter />
      </Sidebar>
    );
}
 
export default AppSidebar;