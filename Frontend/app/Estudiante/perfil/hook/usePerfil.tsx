//frontend/app/Estudiante/perfil/hook/usePerfil.tsx
"use client";

//hook personalizado para manejar la lógica del perfil del estudiante.
import { useAuth } from "@/context/context";
import { User } from "@/app/login/types/user";
import { useState, useEffect } from "react";

//Función para obtener los datos del perfil del estudiante
export const usePerfil = () => {
    const {user, updateUser } = useAuth(); //Obtener el usuario autenticado del contexto de autenticación
    const [perfil, setPerfil] = useState<User | null>(null); //Estado para almacenar los datos del perfil
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    //Efecto para actualizar el perfil cuando el usuario autenticado cambia
    useEffect(() => {
        setPerfil(user || null); //Actualizar el perfil con los datos del usuario autenticado o null
        setError(null);
        setSuccess(null);
    }, [user]); //Dependencia del efecto para actualizar cuando el usuario cambia

    //Función para actualizar un campo del perfil de forma controlada
    const handleChange = (
        field: keyof User, //Campo del perfil a actualizar (nombre, apellido, email, contraseña)
        value: string //Valor del campo a actualizar
    ) => {
        setPerfil((currentPerfil) => {
            if (!currentPerfil) {
                return currentPerfil;
            }

            return {
                ...currentPerfil,
                [field]: value,
            };
        });
        setError(null);
        setSuccess(null);
    };

    //Función para guardar los cambios del perfil
    const savePerfil = () => {
        if (!perfil) {
            setError("No hay un perfil cargado para editar");
            return false;
        }

        try {
            updateUser(perfil);
            setIsEditing(false);
            setSuccess("Perfil actualizado correctamente");
            setError(null);
            return true;
        } catch {
            setError("No se pudo guardar el perfil");
            return false;
        }
    };

    //Función para restaurar el perfil original autenticado
    const resetPerfil = () => {
        setPerfil(user);
        setIsEditing(false);
        setError(null);
        setSuccess(null);
    };

    //Retornar el perfil para ser utilizado en el componente de perfil del estudiante
    return {
        perfil,
        isEditing,
        setIsEditing,
        error,
        success,
        handleChange,
        savePerfil,
        resetPerfil,
    };
}
