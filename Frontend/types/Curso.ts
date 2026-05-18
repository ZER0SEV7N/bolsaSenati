import { Tarea } from "@/types/Tarea";

export type ciclo = "I" | "II" | "III" | "IV" | "V" | "VI";

export interface Curso {
  id: string;
  nombre: string;
  credito: number;
  tareas: Tarea[];
  createAt: string;
  updateAt: string;
}
