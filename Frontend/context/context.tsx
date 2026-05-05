//bolsasenati/frontend/context/context.tsx
//Contexto para manejar el estado global de autenticación en la aplicación.
import { createContext, useContext, useState, useEffect, Children } from "react"
import { User } from "../app/login/types/user"
'use client';

type AuthContextType = {
    isAuthenticated: boolean
    user: User | null
    login: (username: string, password: string) => void
    logout: () => void
    rol?: string | null
    token?: string | null
}

//Creación del contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined); //Proveedor del contexto de autenticación

export const AuthProvider = ({Children }: {Children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null); //Estado para almacenar el usuario autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false); //Estado para manejar la autenticación
    const [isLoading, setIsLoading] = useState(true); //Estado para manejar la carga inicial del usuario

    useEffect(() => {
        checkauth(); //Verificar la autenticación al cargar el componente
    }, []);

    //Función para manejar el inicio de sesión
    const checkauth = () => {
        //Aquí iría la lógica real para verificar la autenticación, como una llamada a una API o revisar el localStorage
        //Por ahora, utilizaremos un user.json de ejemplo para simular la autenticación
        import("../app/login/data/user.json").then((data) => {
            const foundUser = (data as any[]).find((u: any) => u.nombre === "Denis" && u.apellido === "Jara") as User | undefined;
            if (foundUser) {
                setIsAuthenticated(true);
                setUser(foundUser);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        }).finally(() => {
            setIsLoading(false); //Indicar que la carga ha terminado
        });
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
        login: checkauth,
        logout,
    };

    //Renderizar el proveedor del contexto con los hijos
    return (
        <AuthContext.Provider value={value}>
            {Children}
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
