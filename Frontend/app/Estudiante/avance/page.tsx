"use client";

import CheckListCard from "@/components/CheckListCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SimpleProgressCard } from "@/components/SimpleProgressCard";

import { useCurso } from "@/hooks/useCurso";
import { useDashboard } from "@/hooks/useDashboard";

function AvancePage() {
  const { cursos, operacionEstado } = useCurso();
  const { avancePea } = useDashboard();

  return (
    <div>
      <div className="flex items-center justify-between text-3xl font-bold py-4">
        <h1>Seguimiento del Plan Especifico de Aprendizaje</h1>
      </div>
      <section className="space-y-4">
        <Card className="p-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="col-span-full">
              <h1 className="text-xl font-bold mb-2">
                Progreso General del PEA
              </h1>
              <p className="text-sm mb-2">
                Has completado el {avancePea?.porcentajeCumplimiento ?? 0}% de
                tu plan de aprendizaje
              </p>
              <Progress
                value={avancePea?.porcentajeCumplimiento ?? 0}
                className="w-full h-2"
                indicatorClassName="bg-black dark:bg-white"
              />
            </div>
            {cursos?.map((curso) => (
              <SimpleProgressCard data={curso} key={curso.id} />
            ))}
          </div>
        </Card>
        <Card className="p-6">
          {cursos?.map((curso) => (
            <div key={curso.id} className="px-6 py-4 overflow-visible">
              <CheckListCard data={curso} onCheckChange={operacionEstado} />
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}

export default AvancePage;
