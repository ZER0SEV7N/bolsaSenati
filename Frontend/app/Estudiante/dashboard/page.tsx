"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, CalendarDays, MessageSquare, ListTodo, CheckCircle2, BadgeCheck, BarChart3, MessagesSquare } from "lucide-react";
import { Tarea } from "./types/Tarea";
import { CalificacionCards } from "@/components/dashboard/CalificacionCards";
import { AvancePEACards } from "@/components/dashboard/AvancePEACards";

// Datos de ejemplo
const historialVisitas = [
  { fecha: "08 May 2025", estado: "Aprobado" },
  { fecha: "01 May 2025", estado: "Aprobado" },
  { fecha: "24 Abr 2025", estado: "Bajo" },
  { fecha: "17 Abr 2025", estado: "Aprobado" },
];

const ultimaVisita = {
  fecha: "15 Abr 2025",
  hora: "14:30 hrs",
  monitor: "Carlos Rodríguez",
};

const comentarios = [
  {
    fecha: "15 Mar 2025",
    calificacion: 18,
    monitor: "Carlos Rodríguez",
    mensaje:
      "Excelente avance en el módulo de mantenimiento preventivo. Mantén el ritmo y refuerza la documentación de cada operación.",
  },
  {
    fecha: "01 Mar 2025",
    calificacion: 15,
    monitor: "Ana Flores",
    mensaje:
      "Buen desempeño general, sin embargo necesitas mejorar la puntualidad en la entrega de reportes semanales.",
  },
  {
    fecha: "15 Feb 2025",
    calificacion: 17,
    monitor: "Carlos Rodríguez",
    mensaje:
      "Progreso notable en revisión de equipos. Se recomienda reforzar los procedimientos de seguridad industrial.",
  },
];

const tareas: Tarea[] = [
  {
    id: 1,
    titulo: "Mantenimiento Preventivo",
    descripcion: "Revisión y lubricación de maquinaria pesada",
    fecha: "10 May 2025",
    estado: "Completadas",
    rating: 5,
  },
  {
    id: 2,
    titulo: "Revisión de Equipos",
    descripcion: "Inspección de equipos de seguridad personal",
    fecha: "08 May 2025",
    estado: "Completadas",
    rating: 4,
  },
  {
    id: 3,
    titulo: "Reporte Semanal",
    descripcion: "Elaboración del reporte de actividades",
    fecha: "12 May 2025",
    estado: "En Progreso",
    rating: null,
  },
  {
    id: 4,
    titulo: "Calibración de Instrumentos",
    descripcion: "Calibración de equipos de medición",
    fecha: "15 May 2025",
    estado: "En Progreso",
    rating: null,
  },
  {
    id: 5,
    titulo: "Diagnóstico de Fallas",
    descripcion: "Análisis de fallas en línea de producción",
    fecha: "20 May 2025",
    estado: "Todas",
    rating: null,
  },
  {
    id: 6,
    titulo: "Instalación Eléctrica",
    descripcion: "Revisión del tablero eléctrico principal",
    fecha: "05 May 2025",
    estado: "Completadas",
    rating: 3,
  },
];

// Helper: Rating de estrellas
function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) return null;
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3.5 w-3.5 ${
            s <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-slate-600"
          }`}
        />
      ))}
    </div>
  );
}

// Helper: Lista de tareas filtradas
function TareasFiltradas({ filtro, tareas }: { filtro: string; tareas: Tarea[] }) {
  const filtradas =
    filtro === "Todas" ? tareas : tareas.filter((t) => t.estado === filtro);

  return (
    <div className="space-y-2">
      {filtradas.map((tarea) => (
        <div
          key={tarea.id}
          className="flex items-start justify-between rounded-xl border border-border bg-card p-3 hover:bg-muted transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-semibold text-foreground truncate">
                {tarea.titulo}
              </p>
              {tarea.estado === "Completadas" && (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {tarea.descripcion}
            </p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <CalendarDays className="h-3 w-3" />
                {tarea.fecha}
              </span>
              <StarRating rating={tarea.rating} />
            </div>
          </div>
        </div>
      ))}
      {filtradas.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-6">
          No hay tareas en esta categoría.
        </p>
      )}
    </div>
  );
}

// Pagina principal
export default function DashboardPage() {
  return (
    <Card>
      {/* ── HEADER ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-background px-6 py-8 border-b border-border">
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-1/3 h-48 w-48 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Bienvenido Aprendiz
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Aquí puedes ver tu avance, calificaciones y comentarios de tus monitores.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* ── CALIFICACIÓN ACTUAL ── */}
        <section>
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            Calificación Actual
          </h2>
          <CalificacionCards
            promedio={19}
            ultimaVisita={ultimaVisita}
            historialVisitas={historialVisitas}
          />
        </section>

        {/* ── AVANCE PEA ── */}
        <section>
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
            <BarChart3 className="h-3.5 w-3.5 text-violet-400 drop-shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
            Avance PEA
          </h2>
          <AvancePEACards
            cumplimiento={87}
            tareas={tareas}
            operacionesEjecutadas={18}
            operacionesPendientes={6}
          />
        </section>

        {/* ── FEEDBACK Y GESTIÓN ── */}
        <section>
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
            <MessagesSquare className="h-3.5 w-3.5 text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
            Feedback y Gestión
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

            <Card className="border border-border bg-card">
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <MessageSquare className="h-4 w-4 text-slate-400" />
                  Comentarios del Monitor
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-4">
                {comentarios.map((c, i) => (
                  <div
                    key={i}
                    className="relative pl-4 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:rounded-full before:bg-gradient-to-b before:from-violet-500 before:to-violet-500/0"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                        <CalendarDays className="h-3 w-3" />
                        {c.fecha}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                        Nota: {c.calificacion}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-violet-400 mb-1">
                      {c.monitor}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {c.mensaje}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-border bg-card">
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <ListTodo className="h-4 w-4 text-slate-400" />
                  Actividades Detalladas
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <Tabs defaultValue="Todas">
                  <TabsList className="w-full mb-4 bg-white/[0.04] border border-white/[0.06] p-1 h-auto">
                    <TabsTrigger
                      value="Todas"
                      className="flex-1 text-xs py-1.5 data-[state=active]:bg-white/10 data-[state=active]:text-white"
                    >
                      Todas
                    </TabsTrigger>
                    <TabsTrigger
                      value="En Progreso"
                      className="flex-1 text-xs py-1.5 data-[state=active]:bg-white/10 data-[state=active]:text-white"
                    >
                      En Progreso
                    </TabsTrigger>
                    <TabsTrigger
                      value="Completadas"
                      className="flex-1 text-xs py-1.5 data-[state=active]:bg-white/10 data-[state=active]:text-white"
                    >
                      Completadas
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="Todas" className="mt-0">
                    <TareasFiltradas filtro="Todas" tareas={tareas} />
                  </TabsContent>
                  <TabsContent value="En Progreso" className="mt-0">
                    <TareasFiltradas filtro="En Progreso" tareas={tareas} />
                  </TabsContent>
                  <TabsContent value="Completadas" className="mt-0">
                    <TareasFiltradas filtro="Completadas" tareas={tareas} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

          </div>
        </section>
      </div>
    </Card>
  );
}