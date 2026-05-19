"use client";

import { useEffect, useState } from "react";
import {
  CalificacionData,
  AvancePeaData,
  TareasData,
  ComentarioDTO,
} from "@/app/Estudiante/dashboard/types/dashboard";
import api from "@/lib/config";

// Helper: para convertir la fecha de Ultima Visita, por ejemplo: "2025-05-08" → "8 May 2025"
const formatearFecha = (fechaISO: string) => {
  const [year, month, day] = fechaISO.split("-");
  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  return `${parseInt(day)} ${meses[parseInt(month) - 1]} ${year}`;
};

export interface DashboardData {
  calificacion: CalificacionData | null;
  avancePea: AvancePeaData | null;
  tareasData: TareasData | null;
  comentarios: ComentarioDTO[];
  cargando: boolean;
  error: string | null;
  ultimaVisitaFormateada: {
    fecha: string;
    hora: string;
    monitor: string;
  } | null;
  historialFormateado: { fecha: string; estado: string }[];
  tareasParaCards: Array<{
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    rating: number | null;
    estado: "Completadas" | "En Progreso";
  }>;
}

export function useDashboard(): DashboardData {
  const [calificacion, setCalificacion] = useState<CalificacionData | null>(
    null,
  );
  const [avancePea, setAvancePea] = useState<AvancePeaData | null>(null);
  const [tareasData, setTareasData] = useState<TareasData | null>(null);
  const [comentarios, setComentarios] = useState<ComentarioDTO[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const [resCalif, resAvance, resTareas, resComent] = await Promise.all([
          api.get("/dashboard/calificacion"),
          api.get("/dashboard/avance-pea"),
          api.get("/dashboard/tareas"),
          api.get("/dashboard/comentarios"),
        ]);
        setCalificacion(resCalif.data.data);
        setAvancePea(resAvance.data.data);
        setTareasData(resTareas.data.data);
        setComentarios(resComent.data.data.comentarios ?? []);
      } catch (err) {
        setError("No se pudo cargar la información del dashboard.");
        console.error(err);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  // Preparar datos para los componentes
  const ultimaVisitaFormateada = calificacion?.ultimaVisita
    ? {
        fecha: formatearFecha(calificacion.ultimaVisita.fecha),
        hora: "—",
        monitor: calificacion.ultimaVisita.instructor ?? "—",
      }
    : null;

  const historialFormateado = (calificacion?.historialVisitas ?? []).map(
    (v) => ({
      fecha: formatearFecha(v.fecha),
      estado: v.estado,
    }),
  );

  const tareasParaCards = (tareasData?.tareas ?? []).map((t) => ({
    id: t.id,
    titulo: t.nombre,
    descripcion: t.curso,
    fecha: "—",
    rating: t.estado === "completada" ? 5 : null,
    estado:
      t.estado === "completada"
        ? "Completadas"
        : ("En Progreso" as "Completadas" | "En Progreso"),
  }));

  return {
    calificacion,
    avancePea,
    tareasData,
    comentarios,
    cargando,
    error,
    ultimaVisitaFormateada,
    historialFormateado,
    tareasParaCards,
  };
}
