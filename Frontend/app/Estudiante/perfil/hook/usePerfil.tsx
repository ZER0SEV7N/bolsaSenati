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
    sede?: string;
}

export const usePerfil = () => {
    const [perfil, setPerfil] = useState<AprendizPerfil | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // ESTADOS DE PALABRAS CLAVE
    const [palabrasClave, setPalabrasClave] = useState<string[]>([
        "Next.js",
        "Spring Boot",
        "Java",
        "MySQL"
    ]);
    const [nuevaPalabra, setNuevaPalabra] = useState("");

    const agregarPalabraClave = () => {
        const textoLimpio = nuevaPalabra.trim();
        if (textoLimpio && !palabrasClave.includes(textoLimpio)) {
            setPalabrasClave([...palabrasClave, textoLimpio]);
            setNuevaPalabra(""); 
        }
    };

    const eliminarPalabraClave = (palabraAEliminar: string) => {
        setPalabrasClave(palabrasClave.filter((p) => p !== palabraAEliminar));
    };

    const cargarPerfil = async () => {
        try {
            setLoading(true);
            const response = await api.get("/auth/perfil");
            if (response.data && response.data.success) {
                setPerfil(response.data.data);
            } else {
                setError("No se pudo estructurar el perfil correctamente.");
            }
        } catch (err: any) {
            console.error("Error cargando perfil:", err);
            setError(err.response?.data?.message || "Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarPerfil();
    }, []);

    const handleChange = (field: keyof AprendizPerfil, value: string) => {
        setPerfil((currentPerfil) => {
            if (!currentPerfil) return currentPerfil;
            return { ...currentPerfil, [field]: value };
        });
    };

    const resetPerfil = () => {
        cargarPerfil();
        setIsEditing(false);
    };

    return {
        perfil,
        loading,
        error,
        success,
        isEditing,
        setIsEditing,
        handleChange,
        resetPerfil,
        // ¡SÚPER IMPORTANTE REVISAR QUE ESTO ESTÉ AQUÍ!
        palabrasClave,
        nuevaPalabra,
        setNuevaPalabra,
        agregarPalabraClave,
        eliminarPalabraClave
    };
};