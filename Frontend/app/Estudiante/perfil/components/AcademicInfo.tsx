// frontend/app/Estudiante/perfil/components/AcademicInfo.tsx
import { Card } from "@/components/ui/card";
import { AprendizPerfil } from "../hook/usePerfil";

type AcademicInfoProps = {
    perfil: AprendizPerfil | null;
};

export function AcademicInfo({ perfil }: AcademicInfoProps) {
    return (
        <Card className="p-6 space-y-4">
            <div>
                <h2 className="text-xl font-bold">Información Académica</h2>
                <p className="text-sm text-muted-foreground">
                    Datos institucionales (no editables)
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                    <p className="text-sm text-muted-foreground">Correo Institucional</p>
                    <h3 className="font-medium text-sm break-all">
                        {perfil?.correoInstitucional || "No asignado"}
                    </h3>
                </div>



                <div>
                    <p className="text-sm text-muted-foreground">Carrera</p>
                    <h3 className="font-medium text-sm">
                        {perfil?.carrera || "No asignada"}
                    </h3>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Ciclo Actual</p>
                    <h3 className="font-medium text-sm">
                        {perfil?.ciclo ? `${perfil.ciclo} Ciclo` : "-"}
                    </h3>
                </div>


                <div>
                    <p className="text-sm text-muted-foreground">Sede</p>
                    <h3 className="font-medium text-sm">
                        { "Lima Centro"} 
                    </h3>
                </div>

            </div>
        </Card>
    );
}