import type { ReactNode } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-gray-50">
        <SidebarTrigger />
        <div className="p-2">{children}</div>
      </main>
    </SidebarProvider>
  );
};
export default Layout;
