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
import { useRouter } from "next/navigation";

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
}: {
  menuItems: { title: string; url: string }[];
}) {
  return (
    <Sidebar className="bg-[#2f343a] text-white border-none">
      {/* Cabecera */}
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3 justify-center">
          <div className="rounded-lg overflow-hidden">
            {/* Logo de Senati */}
            <Image
              src="/Senati_logo_completo.png"
              alt="Logo SENATI"
              width={140}
              height={140}
            />
          </div>
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
