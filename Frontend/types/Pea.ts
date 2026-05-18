interface Operation {
  id: string;
  nombre: string;
  completado: boolean;
}

export interface Hito {
  id: string;
  nombre: string;
  progreso: number;
  operaciones?: Operation[];
}

export interface CourseData {
  id: string;
  titulo: string;
  progreso: number;
  hitos?: Hito[];
}
