// frontend/app/Estudiante/perfil/hook/usePerfil.tsx
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/config";

export interface AprendizPerfil {
    id: number;
    nombres: string;
    apellidos: string;
    documentoIdentidad: string;
    correoPersonal: string;
    telefono: string;
    rol: string;
    correoInstitucional: string;
    carrera: string;
    ciclo: string;
    palabrasClave?: string;
}

export const usePerfil = () => {
    const [perfil, setPerfil] = useState<AprendizPerfil | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // ESTADOS SIMULADOS (LOCALSTORAGE)
    const [fotoPerfil, setFotoPerfil] = useState<string>("https://github.com/shadcn.png");
    const [palabrasClave, setPalabrasClave] = useState<string[]>([]);
    const [nuevaPalabra, setNuevaPalabra] = useState("");

    const cargarPerfil = async () => {
        try {
            setLoading(true);
            const response = await api.get("/auth/perfil");
            if (response.data && response.data.success) {
                setPerfil(response.data.data);
            }

            if (typeof window !== "undefined") {
                
                const fotoGuardada = localStorage.getItem("simulado_foto_perfil");
                if (fotoGuardada) setFotoPerfil(fotoGuardada);

                
                const tagsGuardados = localStorage.getItem("simulado_palabras_clave");
                if (tagsGuardados) {
                    setPalabrasClave(JSON.parse(tagsGuardados));
                } else {
                    
                    const porDefecto = ["Next.js", "Spring Boot", "Java", "MySQL"];
                    setPalabrasClave(porDefecto);
                    localStorage.setItem("simulado_palabras_clave", JSON.stringify(porDefecto));
                }
            }
        } catch (err: any) {
            console.error("Error cargando perfil:", err);
            setError("No se pudo conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarPerfil();
    }, []);

    // Función para cambiar la foto (Simulado)
    const cambiarFotoPerfil = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setFotoPerfil(base64String);
            localStorage.setItem("simulado_foto_perfil", base64String);
        };
        reader.readAsDataURL(file);
    };

    
    const agregarPalabraClave = () => {
        const textoLimpio = nuevaPalabra.trim();
        if (textoLimpio && !palabrasClave.includes(textoLimpio)) {
            const listaActualizada = [...palabrasClave, textoLimpio];
            setPalabrasClave(listaActualizada);
            setNuevaPalabra("");
            localStorage.setItem("simulado_palabras_clave", JSON.stringify(listaActualizada));
        }
    };

    // Función para eliminar palabra clave (Simulado)
    const eliminarPalabraClave = (palabraAEliminar: string) => {
        const listaActualizada = palabrasClave.filter((p) => p !== palabraAEliminar);
        setPalabrasClave(listaActualizada);
        localStorage.setItem("simulado_palabras_clave", JSON.stringify(listaActualizada));
    };

    const handleChange = (field: keyof AprendizPerfil, value: string) => {
        setPerfil((currentPerfil) => {
            if (!currentPerfil) return currentPerfil;
            return { ...currentPerfil, [field]: value };
        });
    };

    return {
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
        cambiarFotoPerfil
    };
};