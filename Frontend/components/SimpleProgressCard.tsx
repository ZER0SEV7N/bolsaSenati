import { Curso } from "@/types/Curso";
import { Progress } from "./ui/progress";

interface SimpleProgressCardProps {
  data: Curso;
}

export function SimpleProgressCard({ data }: SimpleProgressCardProps) {
  // Extraer todas las operaciones de todas las tareas de este curso
  const operaciones = (data.tareas ?? []).flatMap((t) => t.operaciones ?? []);
  const totalOps = operaciones.length;

  // Contar cuántas están en estado "realizado"
  const completedOps = operaciones.filter(
    (op) => op.estado === "realizado",
  ).length;

  // Calcular el porcentaje exacto
  const porcentaje =
    totalOps === 0 ? 0 : Math.round((completedOps / totalOps) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-bold uppercase tracking-tight text-foreground">
          {data.nombre}
        </span>
        <span className="text-sm font-bold text-foreground">{porcentaje}%</span>
      </div>
      <Progress
        value={porcentaje}
        className="h-2 w-full"
        indicatorClassName="bg-black dark:bg-white"
      />
    </div>
  );
}
