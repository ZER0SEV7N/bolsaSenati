import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Field, FieldLabel } from "./ui/field";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import type { Curso } from "@/types/Curso";
import type { Tarea } from "@/types/Tarea";
import type { Operacion } from "@/types/Operacion";

interface CheckListCardProps {
  data: Curso | Tarea;
  isChild?: boolean;
  onCheckChange?: (operacionId: number) => void;
}

function CheckListCard({
  data,
  isChild = false,
  onCheckChange,
}: CheckListCardProps) {
  const title =
    "nombre" in data && typeof data.nombre === "string"
      ? data.nombre
      : "tarea" in data && typeof data.tarea === "string"
        ? data.tarea
        : "Item";

  const uniqueId = String(data.id);

  const tareas: Tarea[] = "tareas" in data ? (data.tareas ?? []) : [];

  const operaciones: Operacion[] =
    "operaciones" in data
      ? (data.operaciones ?? [])
      : tareas.flatMap((t) => t.operaciones ?? []);

  const totalOps = operaciones.length;

  const completedOps = operaciones.filter(
    (op) => op.estado === "realizado",
  ).length;

  const progress =
    totalOps === 0 ? 0 : Math.round((completedOps / totalOps) * 100);

  const hasTareas = !isChild && tareas.length > 0;
  const hasOperaciones =
    isChild && "operaciones" in data && (data.operaciones ?? []).length > 0;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={uniqueId} className="border-none">
        <AccordionTrigger className="w-full hover:no-underline py-2 text-foreground">
          <Field className="w-full text-left">
            <FieldLabel className="flex justify-between w-full mb-2 cursor-pointer items-end">
              <span
                className={`font-bold transition-all ${
                  isChild
                    ? "text-sm text-foreground/90"
                    : "text-xl md:text-2xl text-foreground"
                }`}
              >
                {title}
              </span>
              <span className="text-xs font-bold text-foreground/70">
                {progress}%
              </span>
            </FieldLabel>
            <Progress
              value={progress}
              className={`w-full ${isChild ? "h-1.5" : "h-3"}`}
              indicatorClassName="bg-black dark:bg-white"
            />
          </Field>
        </AccordionTrigger>

        <AccordionContent className="pt-2 pb-4 overflow-visible h-auto">
          <div
            className={
              !isChild
                ? "grid grid-cols-1 md:grid-cols-3 gap-4"
                : "pl-4 border-l-2 border-border ml-2 flex flex-col gap-3"
            }
          >
            {hasTareas &&
              tareas.map((ht) => (
                <CheckListCard
                  key={ht.id}
                  data={ht}
                  isChild={true}
                  onCheckChange={onCheckChange}
                />
              ))}

            {hasOperaciones &&
              (data as Tarea).operaciones.map((ho) => (
                <div key={ho.id} className="flex items-center space-x-2 py-1">
                  <Checkbox
                    id={String(ho.id)}
                    checked={ho.estado === "realizado"}
                    onCheckedChange={() => {
                      if (onCheckChange) onCheckChange(Number(ho.id));
                    }}
                  />
                  <Label
                    htmlFor={String(ho.id)}
                    className="text-sm font-medium leading-none cursor-pointer text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {ho.operacion || ho.nombre}
                  </Label>
                </div>
              ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default CheckListCard;
