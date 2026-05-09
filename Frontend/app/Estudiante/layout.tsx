import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavBar } from "@/components/navBar";

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
        <main className="w-full bg-gray-50 dark:bg-[#1e2124] min-h-screen transition-colors">
          <header className="flex h-16 items-center px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#2f343a] transition-colors">
            <SidebarTrigger className="text-black dark:text-white hover:bg-gray-200 dark:hover:bg-[#3a3f47]" />
            <NavBar />
          </header>
          <div className="p-6">
              {children}
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
