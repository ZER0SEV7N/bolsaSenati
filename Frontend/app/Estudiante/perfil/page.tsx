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
    hayCambiosSinGuardar,
    guardarContacto,
    cambiarPassword
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
    <div className="w-full mx-auto max-w-7xl space-y-6 relative pb-6">
      
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {success && (
          <div className="bg-green-600 text-white px-4 py-3 rounded-md shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300 font-medium pointer-events-auto">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-600 text-white px-4 py-3 rounded-md shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300 font-medium pointer-events-auto">
            {error}
          </div>
        )}
      </div>

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
            cambiarPassword={cambiarPassword}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <PersonalInfo 
            perfil={perfil} 
            isEditing={isEditing} 
            setIsEditing={setIsEditing} 
            handleChange={handleChange} 
            guardarContacto={guardarContacto}
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