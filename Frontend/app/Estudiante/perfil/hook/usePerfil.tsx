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
    palabrasClave?: string[]; 
    distritosInteres?: string[]; 
}

export interface DistritoOption {
    id: number;
    distrito: string;
}

export const usePerfil = () => {
    const [perfil, setPerfil] = useState<AprendizPerfil | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [fotoPerfil, setFotoPerfil] = useState<string>("https://github.com/shadcn.png");
    const [palabrasClave, setPalabrasClave] = useState<string[]>([]);
    const [nuevaPalabra, setNuevaPalabra] = useState("");
    
    const [catalogoDistritos, setCatalogoDistritos] = useState<DistritoOption[]>([]); 
    const [distritosSeleccionados, setDistritosSeleccionados] = useState<string[]>([]);
    
    const [palabrasOriginales, setPalabrasOriginales] = useState<string[]>([]);
    const [distritosOriginales, setDistritosOriginales] = useState<string[]>(["", "", ""]);

    const [hayCambiosSinGuardar, setHayCambiosSinGuardar] = useState(false);

    
    const cargarPerfil = async () => {
        try {
            setLoading(true);
            const [perfilRes, distritosRes] = await Promise.all([
                api.get("/auth/perfil"),
                api.get("/distritos")
            ]);

            if (distritosRes.data && distritosRes.data.success) 
                setCatalogoDistritos(distritosRes.data.data);
            
            if (perfilRes.data && perfilRes.data.success) {
                const data = perfilRes.data.data;
                setPerfil(data);
                if (data.palabrasClave) setPalabrasClave(data.palabrasClave);
                
                // Carga dinámica de distritos
                if (data.distritosInteres) 
                    setDistritosSeleccionados(data.distritosInteres); 
                
                if (data.distritosInteres) {
                    const d = [...data.distritosInteres];
                    const slots = [d[0] || "", d[1] || "", d[2] || ""];
                    setDistritosSeleccionados(slots);
                    setDistritosOriginales(slots); // Backup
                }
            }

        if (typeof window !== "undefined") {
            const fotoGuardada = localStorage.getItem("simulado_foto_perfil");
            if (fotoGuardada) setFotoPerfil(fotoGuardada);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error cargando perfil:", err);
            setError("No se pudo conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarPerfil();
    }, []);

    useEffect(() => {
        //Función para comparar dos arreglos sin importar el orden
        const arreglosSonIguales = (arr1: string[], arr2: string[]) => {
            if (arr1.length !== arr2.length) return false;
            //Ordenamos ambos arreglos y comparamos elemento por elemento
            const sorted1 = [...arr1].sort();
            const sorted2 = [...arr2].sort();
            return sorted1.every((val, index) => val === sorted2[index]);
        };

        const distritosCambiaron = !arreglosSonIguales(distritosSeleccionados, distritosOriginales);
        const palabrasCambiaron = !arreglosSonIguales(palabrasClave, palabrasOriginales);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHayCambiosSinGuardar(distritosCambiaron || palabrasCambiaron);
    }, [distritosSeleccionados, palabrasClave, distritosOriginales, palabrasOriginales]);

    //Metodo para actualizar los distritos seleccionados
    const actualizarDistrito = (index: number, valor: string) => {
        const nuevosDistritos = [...distritosSeleccionados];
        nuevosDistritos[index] = valor;
        setDistritosSeleccionados(nuevosDistritos);
    };

    //Metodo para guardar los intereses del aprendiz
    const guardarIntereses = async () => {
        try {
            setError(null);
            setSuccess(null);

            const idsDistritos = distritosSeleccionados
                .filter(nombreDistrito => nombreDistrito !== "")
                .map(nombreDistrito => {
                    const distritoEncontrado = catalogoDistritos.find(d => d.distrito === nombreDistrito);
                    return distritoEncontrado ? distritoEncontrado.id : undefined;
                })
                .filter(id => id !== undefined); 

            await api.patch("/aprendiz/intereses", {
                idsDistritos,
                palabrasClave
            });

            setDistritosOriginales([...distritosSeleccionados]);
            setPalabrasOriginales([...palabrasClave]);
            setHayCambiosSinGuardar(false); 

            setSuccess("¡Intereses actualizados correctamente!");
        } catch (err) {
            console.error(err);
            setError("Hubo un error al guardar tus intereses.");
        }
    };

    //Metodo para cambiar la foto de perfil (simulado con base64 y localStorage)
    const cambiarFotoPerfil = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setFotoPerfil(base64String);
            localStorage.setItem("simulado_foto_perfil", base64String);
        };
        reader.readAsDataURL(file);
    };

    //Metodo para agregar una nueva palabra clave a la lista
    const agregarPalabraClave = () => {
        const textoLimpio = nuevaPalabra.trim();
        if (textoLimpio && !palabrasClave.includes(textoLimpio)) {
            const listaActualizada = [...palabrasClave, textoLimpio];
            setPalabrasClave(listaActualizada);
            setNuevaPalabra("");
        }
    };

    //Metodo para eliminar una palabra clave de la lista
    const eliminarPalabraClave = (palabraAEliminar: string) => {
        const listaActualizada = palabrasClave.filter((p) => p !== palabraAEliminar);
        setPalabrasClave(listaActualizada);
    };

    //Metodo para agregar un nuevo distrito a la lista (si no está ya presente)
    const agregarDistrito = (distrito: string) => {
        if (distrito && !distritosSeleccionados.includes(distrito)) {
            setDistritosSeleccionados([...distritosSeleccionados, distrito]);
        }
    };

    //Metodo para eliminar un distrito de la lista
    const eliminarDistrito = (distritoAEliminar: string) => {
        setDistritosSeleccionados(distritosSeleccionados.filter(d => d !== distritoAEliminar));
    };

    //Metodo para manejar cambios en los campos del perfil
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
        cambiarFotoPerfil,
        catalogoDistritos, 
        distritosSeleccionados, 
        actualizarDistrito,
        agregarDistrito,
        eliminarDistrito, 
        guardarIntereses,
        hayCambiosSinGuardar
    };
};