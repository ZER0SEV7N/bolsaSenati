//bolsa/app/login/hook/auth.tsx
//Hook personalizado para manejar la lógica de autenticación en el formulario de inicio de sesión.
import { useState } from "react"
import { User } from "../types/user"

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    const login = (username: string, password: string) => {
        //Aquí iría la lógica real de autenticación, como una llamada a una API
        //Por ahora, utilizaremos un user.json de ejemplo para simular la autenticación
        import("../data/user.json").then((data) => {
            const foundUser = (data as any[]).find(
                (u: any) => u.nombre === username && u.apellido === password
            ) as User | undefined
            if (foundUser) {
                setIsAuthenticated(true)
                setUser(foundUser)
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
    }

    //Función para cerrar sesión
    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
    }

    //Funcion para devolver el estado de autenticación y el usuario actual
};