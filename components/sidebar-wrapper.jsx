import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export default function Sidebar({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>{children}</div>
    </SidebarProvider>
  );
}
