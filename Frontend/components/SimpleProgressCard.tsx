import { Progress } from "./ui/progress";

interface SimpleProgressProps {
  titulo: string;
  progreso: number;
}

export function SimpleProgressCard({ titulo, progreso }: SimpleProgressProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-bold uppercase tracking-tight text-foreground">
          {titulo}
        </span>
        <span className="text-sm font-bold text-foreground">{progreso}%</span>
      </div>
      <Progress
        value={progreso}
        className="h-2 w-full"
        indicatorClassName="bg-black dark:bg-white"
      />
    </div>
  );
}
