"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MessageSquare, ListTodo, BadgeCheck, BarChart3, MessagesSquare, Loader2 } from "lucide-react";
import { CalificacionCards } from "@/components/dashboard/CalificacionCards";
import { AvancePEACards } from "@/components/dashboard/AvancePEACards";
import { TareasFiltradas } from "@/components/dashboard/TareasFiltradas";
import { ComentarioItem } from "@/components/dashboard/ComentarioItem";
import { CalificacionData, AvancePeaData, TareasData, ComentarioDTO } from "./types/dashboard";
import api from "@/lib/config";

// Helper: para convertir la fecha de Ultima Visita, por ejemplo: "2025-05-08" → "8 May 2025"
const formatearFecha = (fechaISO: string) => {
  const [year, month, day] = fechaISO.split("-");
  const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return `${parseInt(day)} ${meses[parseInt(month) - 1]} ${year}`;
};

export default function DashboardPage() {

  const [calificacion, setCalificacion] = useState<CalificacionData | null>(null);
  const [avancePea, setAvancePea]       = useState<AvancePeaData | null>(null);
  const [tareasData, setTareasData]     = useState<TareasData | null>(null);
  const [comentarios, setComentarios]   = useState<ComentarioDTO[]>([]);
  const [cargando, setCargando]         = useState(true);
  const [error, setError]               = useState<string | null>(null);

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

  if (cargando) return (
    <div className="flex items-center justify-center h-full w-full py-32">
      <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      <span className="ml-3 text-sm text-muted-foreground">Cargando dashboard...</span>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-full w-full py-32">
      <p className="text-sm text-red-500">{error}</p>
    </div>
  );

  // Preparar datos para los componentes
  const ultimaVisitaFormateada = calificacion?.ultimaVisita
    ? { fecha: formatearFecha(calificacion.ultimaVisita.fecha), hora: "—", monitor: calificacion.ultimaVisita.instructor ?? "—" }
    : null;

  const historialFormateado = (calificacion?.historialVisitas ?? []).map((v) => ({
    fecha: formatearFecha(v.fecha),
    estado: v.estado,
  }));

  const tareasParaCards = (tareasData?.tareas ?? []).map((t) => ({
    id: t.id,
    titulo: t.nombre,
    descripcion: t.curso,
    fecha: "—",
    rating: t.estado === "completada" ? 5 : null,
    estado: t.estado === "completada" ? "Completadas" : "En Progreso" as "Completadas" | "En Progreso",
  }));

  return (
    <Card className="flex flex-col w-full h-full overflow-hidden border border-border shadow-sm bg-card">

      {/* Header*/}
      <div className="relative bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-transparent dark:from-background dark:via-muted/30 dark:to-background px-6 py-8 border-b border-border">
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-violet-600/10 dark:bg-violet-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-1/3 h-48 w-48 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Bienvenido Aprendiz</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-muted-foreground">
            Aquí puedes ver tu avance, calificaciones y comentarios de tus monitores.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-transparent">

        {/* Calificacion actual*/}
        <section>
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.4)]" />
            Calificación Actual
          </h2>
          <CalificacionCards
            promedio={calificacion?.promedio ?? 0}
            ultimaVisita={ultimaVisitaFormateada}
            historialVisitas={historialFormateado}
          />
        </section>

        {/* Avance PEA */}
        <section>
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            <BarChart3 className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400 drop-shadow-[0_0_6px_rgba(167,139,250,0.4)]" />
            Avance PEA
          </h2>
          <AvancePEACards
            cumplimiento={avancePea?.porcentajeCumplimiento ?? 0}
            tareas={tareasParaCards}
            operacionesEjecutadas={avancePea?.operacionesRealizadas ?? 0}
            operacionesPendientes={avancePea?.operacionesPendientes ?? 0}
          />
        </section>

        {/* Feedback y Gestion */}
        <section>
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            <MessagesSquare className="h-3.5 w-3.5 text-sky-500 dark:text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.4)]" />
            Feedback y Gestión
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

            {/* Comentarios del Monitor */}
            <Card className="border border-border bg-card shadow-sm">
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <MessageSquare className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  Comentarios del Monitor
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-4">
                {comentarios.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-6">No hay comentarios aún.</p>
                ) : (
                  comentarios.map((c, i) => (
                    <ComentarioItem key={i} comentario={c} />
                  ))
                )}
              </CardContent>
            </Card>

            {/* Actividades Detalladas */}
            <Card className="border border-border bg-card shadow-sm">
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <ListTodo className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  Actividades Detalladas
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <Tabs defaultValue="Todas">
                  <TabsList className="w-full mb-4 bg-slate-100 border border-slate-200 dark:bg-white/[0.04] dark:border-white/[0.06] p-1 h-auto text-slate-500 dark:text-slate-400">
                    {["Todas", "En Progreso", "Completadas"].map((tab) => (
                      <TabsTrigger key={tab} value={tab} className="flex-1 text-xs py-1.5 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-white/10 dark:data-[state=active]:text-white dark:data-[state=active]:shadow-none">
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {["Todas", "En Progreso", "Completadas"].map((tab) => (
                    <TabsContent key={tab} value={tab} className="mt-0">
                      <TareasFiltradas filtro={tab} tareas={tareasData?.tareas ?? []} />
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

          </div>
        </section>

      </div>
    </Card>
  );
}
