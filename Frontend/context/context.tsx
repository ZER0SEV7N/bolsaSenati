//frontend/context/context.tsx
//Define el contexto de autenticacion para toda la aplicacion,
//Manejando el estado del usuario, token y funciones de login/logout/updateUser
"use client";

//Importaciones
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "../app/login/types/user"; 
import users from "../data/user.json"; 

//Type unico para el contexto de autenticacion
type AuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    token: string | null;
    login: (email: string, password: string, redirectTo?: string) => boolean;
    logout: () => void;
    updateUser: (updatedData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Provider que envuelve toda la app para proveer el contexto de autenticacion
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    //Verificar si hay un token y usuario guardados al cargar la app
    useEffect(() => {
        const storedToken = localStorage.getItem("auth_token");
        const storedUser = localStorage.getItem("auth_user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        
        setIsLoading(false); 
    }, []);

    //Funcion para iniciar sesión: Valida con JSON, crea un token falso y guarda todo
    const login = (email: string, password: string, redirectTo: string = "/Estudiante/dashboard") => {
        const foundUser = (users as unknown as User[]).find(
            (u) => u.email === email && u.contraseña === password
        );

        if (foundUser) {
            const fakeToken = `local-mock-token-${Date.now()}`;
            
            //Guardamos en localStorage
            localStorage.setItem("auth_token", fakeToken);
            localStorage.setItem("auth_user", JSON.stringify(foundUser));

            //Actualizamos el estado de React
            setToken(fakeToken);
            setUser(foundUser);

            //Redirigimos al usuario
            router.push(redirectTo);
            return true;
        }

        return false;
    };

    //Funcion para cerrar sesión: Limpia el localStorage, el estado y redirige
    const logout = () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        setToken(null);
        setUser(null);
        router.push("/");
    };
    
    //Funcion para actualizar usuario: Para cuando edites el perfil en la otra pantalla
    const updateUser = (updatedData: Partial<User>) => {
        if (!user) return;
        
        const newUser = { ...user, ...updatedData };
        setUser(newUser);
        localStorage.setItem("auth_user", JSON.stringify(newUser));
    };

    const value = {
        isAuthenticated: !!user,
        isLoading,
        user,
        token,
        login,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};