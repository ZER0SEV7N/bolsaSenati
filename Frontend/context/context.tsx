//Frontend/context/context.tsx
//Contexto de autenticación para manejar el estado del usuario en toda la aplicación
"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/config'; 
import { User } from '../app/login/types/user'; 

//Interface para definir la forma del contexto de autenticación
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, redirectTo?: string) => Promise<void>;
    logout: () => void;
    refreshProfile: () => Promise<void>;
}

//Creación del contexto con un valor inicial indefinido
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Proveedor del contexto que envuelve la aplicación y maneja el estado de autenticación
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        //eslint-disable-next-line react-hooks/immutability
        validarAuth();
    }, []);

    //Metodo para validar si el token es válido y obtener el perfil directamente del backend
    const validarAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            const res = await api.get('/api/auth/perfil'); 
            
            setUser(res.data.data || res.data.usuario || res.data);
        } catch (error) {
            console.error('Error al obtener el perfil o token expirado:', error);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    //Refrescar el perfil después de una actualización (ej. editar datos personales)
    const refreshProfile = async () => {
        try {
            const res = await api.get('/api/auth/perfil');
            setUser(res.data.data);
        } catch (error) {
            console.error('Error al refrescar el perfil:', error);
        }
    };

    //Iniciar sesión: guarda el token, carga el perfil y luego redirige
    const login = async (token: string, redirectTo: string = '/Estudiante/dashboard') => {
        setIsLoading(true);
        localStorage.setItem('token', token);
        await validarAuth();
        router.push(redirectTo);
    };

    //Cerrar sesión: elimina el token, el estado y redirige al inicio
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated: !!user, 
            isLoading, 
            login, 
            logout, 
            refreshProfile 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};