"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  User,
  LayoutDashboard,
  Briefcase,
  Building2,
  BarChart3,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { useAuth } from "@/context/context";

// Mapeo de iconos
const iconMap: Record<string, React.ComponentType> = {
  Dashboard: LayoutDashboard,
  "Bolsa de Trabajo": Briefcase,
  Empresa: Building2,
  "Avance PEA": BarChart3,
  Perfil: UserCircle,
};

export function AppSidebar({
  menuItems,
  role,
}: {
  menuItems: { title: string; url: string }[];
  role?: string;
}) {
  const { user } = useAuth();
  const currentRole = role ?? user?.rol ?? "Invitado";

  return (
    <Sidebar className="bg-[#2f343a] text-white border-none">
      {/* Cabecera */}
      <SidebarHeader className="p-6">
        {/* Contenedor principal: Columna flexible y centrada */}
        <div className="flex flex-col items-center gap-4 justify-center w-full">
          
          <div className="rounded-lg overflow-hidden">
            {/* Logo de Senati */}
            <Image
              src="/Senati_logo_completo.png"
              alt="Logo SENATI"
              width={140}
              height={140}
            />
          </div>

          {/* Badge de rol centralizado y más grande */}
          <Badge 
            variant="outline" 
            className="text-green-300 border-green-300/30 text-sm px-5 py-1.5 font-medium tracking-wide uppercase"
          >
            {currentRole}
          </Badge>
          
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
                    <Icon />
                    <span className="text-[15px]">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
