"use client";

//bolsa/app/login/hook/auth.tsx
//Hook personalizado para manejar la lógica de autenticación en el formulario de inicio de sesión.
import { useState } from "react";
import { User } from "../types/user";
import { useAuth } from "@/context/context";
import { redirect } from "next/navigation";

export const useLogin = () => {
  const { login } = useAuth(); //Obtener la función de login del contexto de autenticación
  const [error, setError] = useState<string | null>(null); //Estado para manejar errores de autenticación

  //Función para manejar el envío del formulario de inicio de sesión
  const handleLogin = (email: string, password: string) => {
    if (!email || !password) {
      setError("Debes ingresar email y contraseña");
      return;
    }

    const isValid = login(email, password);

    setError(isValid ? null : "Credenciales incorrectas");

    if (isValid) {
      redirect("/Estudiante/dashboard"); //Redirigir al dashboard del estudiante después de un inicio de sesión exitoso
    }
  };

  //Retornar la función de manejo de inicio de sesión y el estado de error para ser utilizado en el componente de formulario de inicio de sesión
  return {
    handleLogin,
    error,
  };
};
