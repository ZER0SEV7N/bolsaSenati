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
