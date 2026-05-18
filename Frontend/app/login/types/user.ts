//bolsa/frontend/app/login/types/user.ts
//Tipo de usuario para el formulario de inicio de sesión
export type User = {
    id: number;
    nombres: string;
    apellidos: string;
    correoPersonal: string;
    correoInstitucional?: string; 
    telefono?: string;
    documentoIdentidad: string;
    codigoAprendiz?: string;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    rol?: any; 
}