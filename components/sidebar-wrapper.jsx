import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./ui/sidebar";

export default function Sidebar({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
