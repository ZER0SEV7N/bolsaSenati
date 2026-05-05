import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const menuItems = [
  { title: "Dashboard", url: "/Estudiante/dashboard" },
  { title: "Perfil", url: "/Estudiante/perfil" },
  { title: "Bolsa de Trabajo", url: "/Estudiante/bolsa" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          menuItems={menuItems}
        />
        <main className="flex-1">{children}</main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
