export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  rating: number | null;
  fecha: string;
  estado: "Todas" | "En Progreso" | "Completadas";
}
