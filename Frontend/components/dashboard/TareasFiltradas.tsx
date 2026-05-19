import { Star, CheckCircle2 } from "lucide-react";
import { TareaDetalleDTO } from "@/app/Estudiante/dashboard/types/dashboard";

// Helper: Calificacion de estrellas
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
              : "fill-transparent text-slate-300 dark:text-slate-600"
          }`}
        />
      ))}
    </div>
  );
}

// Componente: Lista de tareas filtradas por estado
export function TareasFiltradas({ filtro, tareas }: { filtro: string; tareas: TareaDetalleDTO[] }) {
  const filtradas =
    filtro === "Todas"
      ? tareas
      : filtro === "Completadas"
      ? tareas.filter((t) => t.estado === "completada")
      : tareas.filter((t) => t.estado === "en progreso");

  return (
    <div className="space-y-2">
      {filtradas.map((tarea) => (
        <div
          key={tarea.id}
          className="flex items-start justify-between rounded-xl border border-border bg-card p-3 hover:bg-muted/50 dark:hover:bg-muted transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-semibold text-foreground truncate">
                {tarea.nombre}
              </p>
              {tarea.estado === "completada" && (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">{tarea.curso}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-[10px] text-muted-foreground">
                {tarea.operacionesRealizadas}/{tarea.totalOperaciones} operaciones
              </span>
              {tarea.estado === "completada" && <StarRating rating={5} />}
            </div>
          </div>
        </div>
      ))}
      {filtradas.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-6">
          No ahi tareas en esta categoria
        </p>
      )}
    </div>
  );
}
