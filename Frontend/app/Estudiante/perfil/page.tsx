"use client";

import { ProfileCard } from "./components/ProfileCard";
import { PersonalInfo } from "./components/PersonalInfo";
import { usePerfil } from "./hook/usePerfil";
import { AcademicInfo } from "./components/AcademicInfo";
import { DistritosAdicionales } from "./components/DistritosAdicionales";

export default function PerfilPage() {
    
    const {
        perfil,
        loading,
        error,
        palabrasClave,
        nuevaPalabra,
        setNuevaPalabra,
        agregarPalabraClave,
        eliminarPalabraClave,
        isEditing,
        fotoPerfil,
        cambiarFotoPerfil
    } = usePerfil();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="text-sm text-muted-foreground font-medium animate-pulse">Cargando información...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-destructive/15 text-destructive p-4 rounded-md border border-destructive/30 max-w-2xl mx-auto">
                    <p className="font-bold">Error al cargar el perfil</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
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

            <div className="lg:col-span-2 space-y-6">
                <PersonalInfo perfil={perfil} />
                <AcademicInfo perfil={perfil} />
                <DistritosAdicionales />
            </div>
        </div>
    );
}
