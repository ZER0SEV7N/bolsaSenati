import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ListTodo, Star } from "lucide-react";
import { Tarea } from "@/app/Estudiante/dashboard/types/Tarea";

// Tipos
type AvancePEACardsProps = {
  cumplimiento: number;
  tareas: Tarea[];
  operacionesEjecutadas: number;
  operacionesPendientes: number;
};

// Componente principal
export function AvancePEACards({
  cumplimiento,
  tareas,
  operacionesEjecutadas,
  operacionesPendientes,
}: AvancePEACardsProps) {
  const tareasCompletadas = tareas.filter((t) => t.estado === "Completadas").length;
  const tareasPendientes = tareas.filter((t) => t.estado !== "Completadas").length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Cumplimiento */}
      <Card className="relative overflow-hidden border border-violet-500/60 bg-card shadow-[0_0_15px_rgba(167,139,250,0.15)]">
        <div className="pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full bg-violet-600/30 blur-xl" />
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs text-slate-400 font-medium">Cumplimiento</p>
            <div className="rounded-xl bg-violet-500/15 p-2.5">
              <Star className="h-5 w-5 text-violet-400 drop-shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
            </div>
          </div>
          <div className="flex items-end gap-1.5 mb-3">
            <span className="text-4xl font-black text-violet-400 leading-none">
              {cumplimiento}
            </span>
            <span className="text-lg font-bold text-violet-500 mb-0.5">%</span>
          </div>
          {/* Barra de progreso */}
          <div className="h-2 w-full rounded-full bg-violet-900/40 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400 relative"
              style={{ width: `${cumplimiento}%` }}
            >
              <div className="absolute inset-0 rounded-full shadow-[0_0_8px_2px_rgba(167,139,250,0.5)]" />
            </div>
          </div>
          <p className="mt-1.5 text-[10px] text-slate-500">
            Meta: 100% al cierre del semestre
          </p>
        </CardContent>
      </Card>

      {/* Tareas */}
      <Card className="relative overflow-hidden border border-pink-500/60 bg-card shadow-[0_0_15px_rgba(236,72,153,0.15)]">
        <div className="pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full bg-pink-600/30 blur-xl" />
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

      {/* Operaciones */}
      <Card className="relative overflow-hidden border border-red-500/60 bg-card shadow-[0_0_15px_rgba(239,68,68,0.15)]">
        <div className="pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full bg-red-600/30 blur-xl" />
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Operaciones</p>
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
  );
}
