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
import type { CourseData, Hito } from "@/types/Pea";

interface CheckListCardProps {
  data: CourseData | Hito;
  isChild?: boolean;
}

function CheckListCard({ data, isChild = false }: CheckListCardProps) {
  const title = "titulo" in data ? data.titulo : data.nombre;
  const progress = data.progreso;
  const uniqueId = String(data.id);

  const hasHitos = "hitos" in data && data.hitos;
  const hasOperaciones = "operaciones" in data && data.operaciones;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={uniqueId} className="border-none">
        <AccordionTrigger className="w-full hover:no-underline py-2 text-foreground">
          <Field className="w-full text-left">
            <FieldLabel className="flex justify-between w-full mb-2 cursor-pointer items-end">
              <span
                className={`font-bold transition-all ${
                  isChild
                    ? "text-xs text-foreground/80"
                    : "text-xl md:text-1xl text-foreground"
                }`}
              >
                {title}
              </span>
              <span className="text-xs font-bold text-foreground">
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
            {hasHitos &&
              data.hitos?.map((ht) => (
                <CheckListCard key={ht.id} data={ht} isChild={true} />
              ))}

            {hasOperaciones &&
              data.operaciones?.map((ho) => (
                <div key={ho.id} className="flex items-center space-x-2 py-1">
                  <Checkbox id={ho.id} checked={ho.completado} />
                  <Label
                    htmlFor={ho.id}
                    className="text-ls font-medium leading-none cursor-pointer text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {ho.nombre}
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
