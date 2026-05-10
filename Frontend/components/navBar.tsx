/* eslint-disable react-hooks/immutability */
//frontend/components/navBar.tsx
//Componente de barra de navegacion superior,
//Con boton de cambiar tema, notificaciones, y perfil de usuario.
"use client";
import { useEffect, useState } from "react";
import { Sun, Moon, Bell, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/context";
import { useRouter } from "next/navigation";

//Componente de barra de navegacion superior
export function NavBar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  //Inicializar tema desde localStorage al montar
  useEffect(() => {
    async function initializeTheme() {
      setMounted(true);
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      const initialTheme = savedTheme || "light";
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }
    initializeTheme();
  }, []);

  //Función para aplicar el tema al documento
  const applyTheme = (newTheme: "light" | "dark") => {
    const htmlElement = document.documentElement;
    if (newTheme === "dark") htmlElement.classList.add("dark");
    else htmlElement.classList.remove("dark");
  };

  //Funcion para cambiar el tema entre claro y oscuro
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  //Funcion para cerrar sesion
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!mounted) return null;

  return (
    <nav className="w-full flex items-center justify-end gap-4 px-2 py-4 text-black dark:text-white">
      {/* Botones de derecha */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#3a3f47] transition-colors"
          title={`Cambiar a tema ${theme === "light" ? "oscuro" : "claro"}`}
        >
          {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#3a3f47] transition-colors">
          <Bell size={20} />
        </button>
      </div>

      {/* Separador visual opcional */}
      <div className="h-8 w-px bg-gray-300 dark:bg-gray-600 mx-2 hidden sm:block"></div>

      {/* Dropdown de perfil de usuario con Nombre y Avatar juntos */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 outline-none p-1 pr-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#3a3f47] transition-colors">
          <Avatar className="h-9 w-9 border-2 border-transparent">
            <AvatarImage src="/avatar-placeholder.png" alt="Avatar" />
            <AvatarFallback className="bg-blue-600 text-white font-semibold">
              {user?.nombre?.charAt(0) || ""}
              {user?.apellido?.charAt(0) || ""}
            </AvatarFallback>
          </Avatar>

          {user && (
            <div className="hidden md:flex flex-col items-start mr-1">
              <span className="text-sm font-medium leading-none">
                {user.nombre} {user.apellido}
              </span>
            </div>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="bg-white dark:bg-[#2f343a] text-black dark:text-white border-gray-200 dark:border-gray-700 mt-2 w-48"
        >
          <DropdownMenuItem
            onClick={() => router.push("/Estudiante/perfil")}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-[#3a3f47] focus:bg-gray-100 dark:focus:bg-[#3a3f47] focus:text-black dark:focus:text-white"
          >
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-[#3a3f47] focus:bg-gray-100 dark:focus:bg-[#3a3f47] text-red-500 dark:text-red-400 focus:text-red-500 dark:focus:text-red-400 mt-1"
          >
            <LogOut size={16} />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
