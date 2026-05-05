"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User, ChevronUp, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";

interface MenuItem {
  title: string;
  url: string;
}

interface AppSidebarProps {
  userName: string;
  menuItems: MenuItem[];
}

export function AppSidebar({ userName, menuItems }: AppSidebarProps) {
  return (
    <Sidebar>
      {/* Cabecera del sidebar */}
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
            B
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Bolsa Senati</span>
            <span className="text-xs text-muted-foreground">
              Panel de Aprendiz
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Contenido del sidebar */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 px-4 py-2"
                    >
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Pie de página del sidebar */}
      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-between">
                  <div className="flex items-center gap-2">
                    <User className="size-4" />
                    {/* Nombre del Usuario */}
                    <span>{userName}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 size-4" />
                  {/* Agregar la logica para cerrar sesión */}
                  <Button variant="ghost">Cerrar Sesión</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
