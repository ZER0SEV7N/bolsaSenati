import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const menuItems = [
  { title: "Dashboard", url: "/Estudiante/dashboard" },
  { title: "Bolsa de Trabajo", url: "/Estudiante/bolsa" },
  { title: "Empresa", url: "/Estudiante/empresa" },
  { title: "Avance PEA", url: "/Estudiante/avance" },
  { title: "Perfil", url: "/Estudiante/perfil" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar menuItems={menuItems} />
        <main className="w-full">
          <header className="flex h-12 items-center px-4 border-b">
            <SidebarTrigger />
          </header>
          {children}
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
