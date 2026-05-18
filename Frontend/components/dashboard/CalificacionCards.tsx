import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Clock, History, CheckCircle2, AlertCircle } from "lucide-react";

// Tipos
type HistorialVisita = {
  fecha: string;
  estado: string;
};

type CalificacionCardsProps = {
  promedio: number;
  ultimaVisita: {
    fecha: string;
    hora: string;
    monitor: string;
  };
  historialVisitas: HistorialVisita[];
};

// Helper: Badge de estado 
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

// Componente principal
export function CalificacionCards({
  promedio,
  ultimaVisita,
  historialVisitas,
}: CalificacionCardsProps) {
  const etiqueta = promedio >= 18 ? "Excelente" : promedio >= 14 ? "Aprobado" : "Por mejorar";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Tarjeta Promedio */}
      <Card className="relative overflow-hidden border border-emerald-500/60 bg-card shadow-[0_0_15px_rgba(52,211,153,0.15)]">
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-emerald-500/40" />
        <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-emerald-500/30 blur-xl" />
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">
                Promedio del Semestre
              </p>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-5xl font-black text-emerald-400 leading-none">
                  {promedio}
                </span>
                <span className="text-xs text-slate-500 mb-1">/20</span>
              </div>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                ✦ {etiqueta}
              </span>
            </div>
            <div className="rounded-xl bg-emerald-500/15 p-2.5">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tarjeta Última Visita */}
      <Card className="relative overflow-hidden border border-orange-500/60 bg-card shadow-[0_0_15px_rgba(249,115,22,0.15)]">
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-orange-500/40" />
        <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-orange-500/30 blur-xl" />
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Última Visita</p>
              <p className="mt-2 text-lg font-bold text-orange-300 leading-tight">
                {ultimaVisita.fecha}
              </p>
              <p className="text-sm text-orange-400/80 font-medium">
                {ultimaVisita.hora}
              </p>
              <p className="mt-1.5 text-[11px] text-slate-500">
                Monitor: {ultimaVisita.monitor}
              </p>
            </div>
            <div className="rounded-xl bg-orange-500/15 p-2.5">
              <Clock className="h-5 w-5 text-orange-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tarjeta Historial */}
      <Card className="relative overflow-hidden border border-sky-500/60 bg-card shadow-[0_0_15px_rgba(56,189,248,0.15)]">
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-sky-500/40" />
        <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-sky-500/30 blur-xl" />
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs text-slate-400 font-medium">
              Historial de Visitas
            </p>
            <div className="rounded-xl bg-sky-500/15 p-2.5">
              <History className="h-5 w-5 text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
            </div>
          </div>
          <div className="space-y-2">
            {historialVisitas.map((visita, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1 border-b border-white/[0.04] last:border-0"
              >
                <span className="text-[11px] text-slate-400">{visita.fecha}</span>
                <EstadoBadge estado={visita.estado} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
