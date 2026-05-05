"use client";

//bolsasenati/frontend/context/context.tsx
//Contexto para manejar el estado global de autenticación en la aplicación.
import { createContext, useContext, useState } from "react"
import { User } from "../app/login/types/user"
import users from "../app/login/data/user.json"

type AuthContextType = {
    isAuthenticated: boolean
    user: User | null
    login: (email: string, password: string) => boolean
    logout: () => void
    rol?: string | null
    token?: string | null
}

//Creación del contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined); //Proveedor del contexto de autenticación

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null); //Estado para almacenar el usuario autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false); //Estado para manejar la autenticación

    //Función para manejar el inicio de sesión
    const login = (email: string, password: string) => {
        const foundUser = (users as User[]).find(
            (u) => u.email === email && u.contraseña === password
        );

        if (foundUser) {
            setIsAuthenticated(true);
            setUser(foundUser);
            return true;
        }

        setIsAuthenticated(false);
        setUser(null);
        return false;
    }

    //Función para manejar el cierre de sesión
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    }

    //Valor del contexto que se proporcionará a los componentes hijos
    const value = {
        isAuthenticated,
        user,
        login,
        logout,
    };

    //Renderizar el proveedor del contexto con los hijos
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

//Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
