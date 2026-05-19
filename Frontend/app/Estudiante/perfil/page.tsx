// frontend/app/Estudiante/perfil/page.tsx
"use client";

import { usePerfil } from "./hook/usePerfil";
import { AcademicInfo } from "./components/AcademicInfo";
import { DistritosAdicionales } from "./components/DistritosAdicionales";
import { PersonalInfo } from "./components/PersonalInfo";
import { ProfileCard } from "./components/ProfileCard";
import { Loader2 } from "lucide-react";

export default function PerfilPage() {
  const {
    perfil,
    loading,
    error,
    success,
    isEditing,
    setIsEditing,
    handleChange, 
    palabrasClave,
    nuevaPalabra,
    setNuevaPalabra,
    agregarPalabraClave,
    eliminarPalabraClave,
    fotoPerfil,
    cambiarFotoPerfil,
    catalogoDistritos,
    distritosSeleccionados,
    agregarDistrito,
    eliminarDistrito,
    guardarIntereses,
    hayCambiosSinGuardar
  } = usePerfil();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Cargando tu perfil...</span>
      </div>
    );
  }

  if (error && !perfil) {
    return <div className="p-8 text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl space-y-6">
      
      {success && <div className="bg-green-100 text-green-800 p-4 rounded-md">{success}</div>}
      {error && <div className="bg-red-100 text-red-800 p-4 rounded-md">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1">
          <ProfileCard
            perfil={perfil}
            palabrasClave={palabrasClave}
            nuevaPalabra={nuevaPalabra}
            setNuevaPalabra={setNuevaPalabra}
            agregarPalabraClave={agregarPalabraClave}
            eliminarPalabraClave={eliminarPalabraClave}
            isEditing={isEditing}
            fotoPerfil={fotoPerfil}
            cambiarFotoPerfil={cambiarFotoPerfil}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <PersonalInfo 
            perfil={perfil} 
            isEditing={isEditing} 
            setIsEditing={setIsEditing} 
            handleChange={handleChange} 
          />
          
          <AcademicInfo perfil={perfil} />
          
          <DistritosAdicionales
            distritos={distritosSeleccionados} 
            agregarDistrito={agregarDistrito} 
            eliminarDistrito={eliminarDistrito} 
            guardarIntereses={guardarIntereses}
            catalogoDistritos={catalogoDistritos} 
            hayCambiosSinGuardar={hayCambiosSinGuardar} 
          />
        </div>

      </div>
    </div>
  );
}