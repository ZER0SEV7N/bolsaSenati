import { CalendarDays } from "lucide-react";
import { ComentarioDTO } from "@/app/Estudiante/dashboard/types/dashboard";

// Componente: Tarjeta de un comentario del instructor
export function ComentarioItem({ comentario }: { comentario: ComentarioDTO }) {
  return (
    <div className="relative pl-4 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:rounded-full before:bg-gradient-to-b before:from-violet-500 before:to-violet-500/0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <CalendarDays className="h-3 w-3" />
          {comentario.fecha}
        </span>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 border dark:border-emerald-500/20 rounded-full px-2 py-0.5">
          Nota: {comentario.calificacion}
        </span>
      </div>
      <p className="text-[11px] font-medium text-violet-600 dark:text-violet-400 mb-1">
        {comentario.instructor}
      </p>
      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        {comentario.mensaje}
      </p>
    </div>
  );
}
