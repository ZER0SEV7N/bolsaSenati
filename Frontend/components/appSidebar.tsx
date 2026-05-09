"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  User,
  LogOut,
  LayoutDashboard,
  Briefcase,
  Building2,
  BarChart3,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/context";
import { useRouter } from "next/navigation";

// Mapeo de iconos
const iconMap: Record<string, any> = {
  Dashboard: LayoutDashboard,
  "Bolsa de Trabajo": Briefcase,
  Empresa: Building2,
  "Avance PEA": BarChart3,
  Perfil: UserCircle,
};

export function AppSidebar({
  menuItems,
}: {
  menuItems: { title: string; url: string }[];
}) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Sidebar className="bg-[#2f343a] text-white border-none">
      {/* Cabecera */}
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="size-12 flex items-center justify-center">
            {/* Logo circular de Senati */}
            <Image
              src="/logoSenati.svg"
              alt="Logo SENATI"
              width={48}
              height={48}
            />
          </div>
          <span className="font-bold text-xl tracking-wider text-gray-100">
            SENATI
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = iconMap[item.title] || User;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="text-gray-300 hover:bg-[#3f454d] hover:text-white py-6"
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-3 w-full"
                  >
                    <Icon className="size-5" />
                    <span className="text-[15px]">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer con Cerrar Sesión */}
      <SidebarFooter className="p-4 border-t border-gray-700">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="text-gray-300 hover:bg-red-500/10 hover:text-red-400 gap-3"
            >
              <LogOut className="size-5" />
              <span>Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-2 text-xs text-gray-500">
              <User className="size-3" />
              <span>{user?.nombre || "Usuario"}</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
