import { Card } from "@/components/ui/card";

export function AcademicInfo() {

    return (

        <Card className="p-6 space-y-4">

            <h2 className="text-x1 font-bold">
                Informacion Académica
            </h2>
            <p className="text-muted-foreground">
                Datos institucionales (no editables)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <p className="text-sm text-muted-foreground">
                        Correo Institucional
                    </p>

                    <h3 className="font-medium">
                        Aprendiz@Sennati.edu.pe
                    </h3>
                </div>


                <div>
                    <p className="text-sm text-muted-foreground">
                        Carrera
                    </p>

                    <h3 className="font-medium">
                        Ingenieria de Software
                    </h3>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Ciclo
                    </p>

                    <h3 className="font-medium">
                        V Ciclo
                    </h3>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Sede
                    </p>

                    <h3 className="font-medium">
                        Lima Centro
                    </h3>
                </div>
            </div>

        </Card>
    )
}