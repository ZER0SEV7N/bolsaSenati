import { Operacion } from "./Operacion";

export interface Tarea {
  id: string;
  operacion: string;
  descripcion: string;
  operaciones: Operacion[];
  createAt: string;
  updateAt: string;
}
