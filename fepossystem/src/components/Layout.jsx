import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "./ui/App-Sidebar";
const Layout = ({children}) => {
    return (
      <SidebarProvider>
        <AppSidebar />
        <main>
            <div className="p-2">
          <SidebarTrigger />
            </div>
          <section className="p-2">{children}</section>
        </main>
      </SidebarProvider>
    );
}
 
export default Layout;