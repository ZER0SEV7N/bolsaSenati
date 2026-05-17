"use client";

//bolsa/app/login/hook/auth.tsx
//Hook personalizado para manejar la lógica de autenticación en el formulario de inicio de sesión.
import { useState } from "react";
import { useAuth } from "@/context/context";
import api from "@/lib/config";

export const useLogin = () => {
  const { login } = useAuth(); //Obtener la función de login del contexto de autenticación
  const [error, setError] = useState<string | null>(null); //Estado para manejar errores de autenticación
  const [isSubmitting, setIsSubmitting] = useState(false); //Estado para manejar el estado de envío del formulario

  //Función para manejar el envío del formulario de inicio de sesión
  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      setError("Debes ingresar email y contraseña");
      return;
    }

    try{
      setIsSubmitting(true); //Indicar que el formulario se está enviando
      setError(null); //Limpiar errores previos

      const res = await api.post("/auth/login", { email, password }); //Enviar solicitud de inicio de sesión al backend

      const { token } = res.data.data; //Obtener el token JWT de la respuesta 
    
      await login(token, "/Estudiante/dashboard"); //Llamar a la función de login del contexto 
      //para almacenar el token y redirigir al dashboard
      //eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError("Credenciales incorrectas");
    } finally {
      setIsSubmitting(false);
    }
  };

  //Retornar la función de manejo de inicio de sesión y el estado de error para ser utilizado en el componente de formulario de inicio de sesión
  return { handleLogin, error, isSubmitting };
};
