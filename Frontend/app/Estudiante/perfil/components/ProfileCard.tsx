// frontend/app/Estudiante/perfil/components/ProfileCard.tsx
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, KeyRound, Camera } from "lucide-react";

type ProfileCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  perfil: any;
  palabrasClave: string[];
  nuevaPalabra: string;
  setNuevaPalabra: (val: string) => void;
  agregarPalabraClave: () => void;
  eliminarPalabraClave: (palabra: string) => void;
  isEditing: boolean;
  fotoPerfil: string;
  cambiarFotoPerfil: (file: File) => void;
  cambiarPassword?: (actual: string, nueva: string) => Promise<boolean>;
};

export function ProfileCard({
  perfil,
  palabrasClave,
  nuevaPalabra,
  setNuevaPalabra,
  agregarPalabraClave,
  eliminarPalabraClave,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isEditing,
  fotoPerfil,
  cambiarFotoPerfil,
  cambiarPassword
}: ProfileCardProps) {
  
  const [openModal, setOpenModal] = useState(false);
  const [passwords, setPasswords] = useState({ actual: "", nueva: "", confirmar: "" });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      cambiarFotoPerfil(e.target.files[0]);
    }
  };

  const handleGuardarContrasena = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.nueva !== passwords.confirmar) {
      alert("La nueva contraseña y la confirmación no coinciden.");
      return;
    }
    
    if (cambiarPassword) {
      const exito = await cambiarPassword(passwords.actual, passwords.nueva);
      if (exito) {
        setOpenModal(false);
        setPasswords({ actual: "", nueva: "", confirmar: "" });
      }
    } else {
      alert("¡Contraseña actualizada con éxito (Simulado)!");
      setOpenModal(false);
      setPasswords({ actual: "", nueva: "", confirmar: "" });
    }
  };

  return (
    <Card className="p-6 flex flex-col items-center gap-4 relative">
      
      
      <div className="relative group">
        <Avatar className="w-40 h-40 border-2 border-muted">
          <AvatarImage src={fotoPerfil} className="object-cover" />
          <AvatarFallback>DN</AvatarFallback>
        </Avatar>
        
        <input 
          type="file" 
          id="foto-upload" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
        />
        
        <label 
          htmlFor="foto-upload" 
          className="absolute bottom-1 right-1 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer shadow-md hover:scale-105 transition-transform flex items-center justify-center"
        >
          <Camera className="w-4 h-4" />
        </label>
      </div>

      <h2 className="text-xl font-bold text-center">
        {perfil?.nombres}
      </h2>

      <Badge>Aprendiz</Badge>

      <Button variant="outline" className="flex items-center gap-2" onClick={() => setOpenModal(true)}>
        <KeyRound className="w-4 h-4" />
        Cambiar contraseña
      </Button>

     
      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-[425px] p-6 bg-background space-y-4 shadow-xl border animate-in zoom-in-95 duration-300">
            <h3 className="text-lg font-semibold">Cambiar Contraseña</h3>
            <form onSubmit={handleGuardarContrasena} className="space-y-4">
              <div className="space-y-2">
                <Label>Contraseña Actual</Label>
                <Input type="password" required value={passwords.actual} onChange={(e)=>setPasswords({...passwords, actual: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Nueva Contraseña</Label>
                <Input type="password" required value={passwords.nueva} onChange={(e)=>setPasswords({...passwords, nueva: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Confirmar Nueva Contraseña</Label>
                <Input type="password" required value={passwords.confirmar} onChange={(e)=>setPasswords({...passwords, confirmar: e.target.value})} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpenModal(false)}>Cancelar</Button>
                <Button type="submit">Actualizar</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      
<div className="w-full space-y-3 pt-2">
  <div>
    <h3 className="font-semibold">Palabras Clave</h3>
    <p className="text-sm text-muted-foreground">Habilidades y tecnologías que manejas</p>
  </div>

  
  <div className="flex gap-2">
    <Input 
      placeholder="Agregar palabra clave..." 
      value={nuevaPalabra}
      onChange={(e) => setNuevaPalabra(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && agregarPalabraClave()}
    />
    <Button size="icon" type="button" onClick={agregarPalabraClave}>
      <Plus className="w-4 h-4" />
    </Button>
  </div>

  
  <div className="flex flex-wrap gap-2 pt-1">
    {palabrasClave.map((palabra, index) => (
      <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1 px-2">
        {palabra}
        
        <button 
          type="button" 
          onClick={() => eliminarPalabraClave(palabra)} 
          className="text-muted-foreground hover:text-destructive rounded-full transition-colors focus:outline-none"
        >
          <X className="w-3 h-3" />
        </button>
      </Badge>
    ))}
    {palabrasClave.length === 0 && (
      <p className="text-xs text-muted-foreground italic">No hay palabras clave registradas.</p>
    )}
  </div>
</div>
    </Card>
  );
}