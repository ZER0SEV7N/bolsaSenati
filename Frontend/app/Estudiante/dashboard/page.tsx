"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  Clock,
  History,
  CheckCircle2,
  AlertCircle,
  Star,
  CalendarDays,
  MessageSquare,
  ListTodo,
} from "lucide-react";
import { Tarea } from "./types/Tarea";

// ─── Datos de ejemplo ───────────────────────────────────────────────
const historialVisitas = [
  { fecha: "08 May 2025", estado: "Aprobado" },
  { fecha: "01 May 2025", estado: "Aprobado" },
  { fecha: "24 Abr 2025", estado: "Bajo" },
  { fecha: "17 Abr 2025", estado: "Aprobado" },
];

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

// ─── Helpers ────────────────────────────────────────────────────────
function EstadoBadge({ estado }: { estado: string }) {
  const esAprobado = estado === "Aprobado";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
        esAprobado
          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
          : "bg-red-500/20 text-red-400 border border-red-500/40"
      }`}
    >
      {esAprobado ? (
        <CheckCircle2 className="mr-1 h-2.5 w-2.5" />
      ) : (
        <AlertCircle className="mr-1 h-2.5 w-2.5" />
      )}
      {estado}
    </span>
  );
}

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

function TareasFiltradas({
  filtro,
  tareas,
}: {
  filtro: string;
  tareas: Tarea[];
}) {
  const filtradas =
    filtro === "Todas" ? tareas : tareas.filter((t) => t.estado === filtro);
  return (
    <div>
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

// ─── Componente Principal ────────────────────────────────────────────
export default function DashboardPage() {
  const tareasCompletadas = tareas.filter(
    (t) => t.estado === "Completadas",
  ).length;
  const tareasPendientes = tareas.filter(
    (t) => t.estado !== "Completadas",
  ).length;
  const operacionesEjecutadas = 18;
  const operacionesPendientes = 6;

  return (
    <Card>
      {/* ── HEADER ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-background px-6 py-8 border-b border-border">
        {/* Glow decorativo */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-1/3 h-48 w-48 rounded-full bg-cyan-500/8 blur-3xl" />

        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Bienvenido Aprendiz
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Aquí puedes ver tu avance, calificaciones y comentarios de tus
            monitores.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* ── SECCIÓN 1: CALIFICACIÓN ACTUAL ── */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
            Calificación Actual
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Tarjeta Promedio - Verde Neón */}
            <Card className="relative overflow-hidden border border-emerald-500/30 bg-card shadow-lg">
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-emerald-500/20" />
              <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-emerald-500/15 blur-xl" />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">
                      Promedio del Semestre
                    </p>
                    <div className="flex items-end gap-2 mt-1">
                      <span className="text-5xl font-black text-emerald-400 leading-none">
                        19
                      </span>
                      <span className="text-xs text-slate-500 mb-1">/20</span>
                    </div>
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                      ✦ Excelente
                    </span>
                  </div>
                  <div className="rounded-xl bg-emerald-500/15 p-2.5">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tarjeta Última Visita - Naranja */}
            <Card className="relative overflow-hidden border border-orange-500/30 bg-card shadow-lg">
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-orange-500/20" />
              <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-orange-500/15 blur-xl" />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">
                      Última Visita
                    </p>
                    <p className="mt-2 text-lg font-bold text-orange-300 leading-tight">
                      15 Abr 2025
                    </p>
                    <p className="text-sm text-orange-400/80 font-medium">
                      14:30 hrs
                    </p>
                    <p className="mt-1.5 text-[11px] text-slate-500">
                      Monitor: Carlos Rodríguez
                    </p>
                  </div>
                  <div className="rounded-xl bg-orange-500/15 p-2.5">
                    <Clock className="h-5 w-5 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tarjeta Historial - Azul grisáceo */}
            <Card className="relative overflow-hidden border border-sky-500/30 bg-card shadow-lg">
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-sky-500/20" />
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs text-slate-400 font-medium">
                    Historial de Visitas
                  </p>
                  <div className="rounded-xl bg-sky-500/15 p-2.5">
                    <History className="h-5 w-5 text-sky-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  {historialVisitas.map((visita, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-1 border-b border-white/[0.04] last:border-0"
                    >
                      <span className="text-[11px] text-slate-400">
                        {visita.fecha}
                      </span>
                      <EstadoBadge estado={visita.estado} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── SECCIÓN 2: AVANCE PEA ── */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
            Avance PEA
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Cumplimiento - Violeta Neón */}
            <Card className="relative overflow-hidden border border-violet-500/30 bg-card shadow-lg">
              <div className="pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full bg-violet-600/15 blur-xl" />
              <CardContent className="p-5">
                <p className="text-xs text-slate-400 font-medium mb-2">
                  Cumplimiento
                </p>
                <div className="flex items-end gap-1.5 mb-3">
                  <span className="text-4xl font-black text-violet-400 leading-none">
                    87
                  </span>
                  <span className="text-lg font-bold text-violet-500 mb-0.5">
                    %
                  </span>
                </div>
                {/* Barra de progreso */}
                <div className="h-2 w-full rounded-full bg-violet-900/40 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400 relative"
                    style={{ width: "87%" }}
                  >
                    <div className="absolute inset-0 rounded-full shadow-[0_0_8px_2px_rgba(167,139,250,0.5)]" />
                  </div>
                </div>
                <p className="mt-1.5 text-[10px] text-slate-500">
                  Meta: 100% al cierre del semestre
                </p>
              </CardContent>
            </Card>

            {/* Tareas - Rosa */}
            <Card className="relative overflow-hidden border border-pink-500/30 bg-card shadow-lg">
              <div className="pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full bg-pink-600/15 blur-xl" />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Tareas</p>
                    <p className="text-4xl font-black text-pink-400 mt-1 leading-none">
                      {tareas.length}
                    </p>
                  </div>
                  <div className="rounded-xl bg-pink-500/15 p-2.5">
                    <ListTodo className="h-5 w-5 text-pink-400" />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="flex-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center py-1.5">
                    <p className="text-base font-bold text-emerald-400">
                      {tareasCompletadas}
                    </p>
                    <p className="text-[10px] text-slate-500">completadas</p>
                  </span>
                  <span className="flex-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center py-1.5">
                    <p className="text-base font-bold text-amber-400">
                      {tareasPendientes}
                    </p>
                    <p className="text-[10px] text-slate-500">pendientes</p>
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Operaciones - Rojo/Coral */}
            <Card className="relative overflow-hidden border border-red-500/30 bg-card shadow-lg">
              <div className="pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full bg-red-600/15 blur-xl" />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">
                      Operaciones
                    </p>
                    <p className="text-4xl font-black text-red-400 mt-1 leading-none">
                      {operacionesEjecutadas + operacionesPendientes}
                    </p>
                  </div>
                  <div className="rounded-xl bg-red-500/15 p-2.5">
                    <CheckCircle2 className="h-5 w-5 text-red-400" />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="flex-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center py-1.5">
                    <p className="text-base font-bold text-emerald-400">
                      {operacionesEjecutadas}
                    </p>
                    <p className="text-[10px] text-slate-500">ejecutadas</p>
                  </span>
                  <span className="flex-1 rounded-lg bg-red-500/10 border border-red-500/20 text-center py-1.5">
                    <p className="text-base font-bold text-red-400">
                      {operacionesPendientes}
                    </p>
                    <p className="text-[10px] text-slate-500">pendientes</p>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── SECCIÓN 3: FEEDBACK Y GESTIÓN ── */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
            Feedback y Gestión
          </h2>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Columna izquierda: Comentarios */}
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

            {/* Columna derecha: Tareas detalladas */}
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
