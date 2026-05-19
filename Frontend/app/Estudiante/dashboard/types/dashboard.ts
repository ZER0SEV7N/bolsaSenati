// Tipos de respuesta de las APIs del dashboard

export interface VisitaDTO {
  fecha: string;
  nota: number;
  estado: string;
  instructor: string;
}

export interface CalificacionData {
  promedio: number;
  ultimaVisita: VisitaDTO | null;
  historialVisitas: VisitaDTO[];
}

export interface AvancePeaData {
  porcentajeCumplimiento: number;
  totalTareas: number;
  tareasCompletadas: number;
  tareasPendientes: number;
  totalOperaciones: number;
  operacionesRealizadas: number;
  operacionesPendientes: number;
}

export interface TareaDetalleDTO {
  id: number;
  nombre: string;
  curso: string;
  totalOperaciones: number;
  operacionesRealizadas: number;
  estado: string;
}

export interface TareasData {
  totalTareas: number;
  tareasCompletadas: number;
  tareasPendientes: number;
  tareas: TareaDetalleDTO[];
}

export interface ComentarioDTO {
  fecha: string;
  calificacion: number;
  instructor: string;
  mensaje: string;
}
