import { Card } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { User } from "@/app/login/types/user";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/context";

import {Input} from "@/components/ui/input";

import { AprendizPerfil } from "../hook/usePerfil";

import { Plus, X } from "lucide-react";


type ProfileCardProps = {
  perfil: AprendizPerfil | null;
  palabrasClave: string[];
  nuevaPalabra: string;
  setNuevaPalabra: (value: string) => void;
  agregarPalabraClave: () => void;
  eliminarPalabraClave: (palabra: string) => void;
};

export function ProfileCard({ 
  perfil,
  palabrasClave,
  nuevaPalabra,
  setNuevaPalabra,
  agregarPalabraClave,
  eliminarPalabraClave
}: ProfileCardProps) {
  const { user } = useAuth();
  const currentRole = user?.rol ?? "Invitado";


  const iniciales = perfil 
    ? `${perfil.nombres?.[0] || ""}${perfil.apellidos?.[0] || ""}` 
    : "AP";

  return (
    <Card className="p-6 flex flex-col items-center gap-4">

      <Avatar className="w-40 h-40">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>DN</AvatarFallback>
      </Avatar>

      <h2 className="text-xl font-bold">
        {perfil ? `${perfil.nombres} ${perfil.apellidos}` : "Cargando..."}
        {perfil?.nombres} {perfil?.apellidos}
      </h2>

      <Badge>
        {currentRole}
      </Badge>

      <Button variant="outline">
        Cambiar contraseña
      </Button>

      <div className="w-full mt-4 space-y-3">
        <div>
          <h3 className="font-semibold text-sm">Palabras Clave</h3>
          <p className="text-xs text-muted-foreground">
            Habilidades y tecnologías que manejas
          </p>
        </div>

        {/* Input usando el estado y funciones del hook */}
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Agrega palabra clave..."
            value={nuevaPalabra}
            onChange={(e) => setNuevaPalabra(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && agregarPalabraClave()}
            className="text-xs placeholder:text-muted-foreground/50 h-9"
          />
          <Button 
            type="button" 
            size="icon" 
            variant="outline"
            onClick={agregarPalabraClave}
            className="h-9 w-9 shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Listado de palabras */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {palabrasClave.map((palabra, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs py-0.5 px-2 flex items-center gap-1 bg-secondary/30"
            >
              {palabra}
              <button
                type="button"
                onClick={() => eliminarPalabraClave(palabra)}
                className="hover:text-destructive rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {palabrasClave.length === 0 && (
            <p className="text-xs text-muted-foreground/60 italic">
              No has agregado habilidades aún.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}