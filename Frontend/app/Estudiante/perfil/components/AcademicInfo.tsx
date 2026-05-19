// frontend/app/Estudiante/perfil/components/AcademicInfo.tsx
import { Card } from "@/components/ui/card";
import { AprendizPerfil } from "../hook/usePerfil";
import { GraduationCap, Mail, BookOpen, Building2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type AcademicInfoProps = {
    perfil: AprendizPerfil | null;
};

export function AcademicInfo({ perfil }: AcademicInfoProps) {
    return (
        <Card className="p-6 space-y-4">
            <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-muted-foreground" />
                    Información Académica
                </h2>
                <p className="text-sm text-muted-foreground">
                    Datos institucionales (no editables)
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="space-y-2">
                    <Label htmlFor="correoInst" className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        Correo Institucional
                    </Label>
                    <Input
                        id="correoInst"
                        value={perfil?.correoInstitucional || "Aprendiz@senati.edu.pe"}
                        readOnly
                    />
                </div>



                <div className="space-y-2">
                    <Label htmlFor="carrera" className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        Carrera
                    </Label>
                    <Input
                        id="carrera"
                        value={perfil?.carrera || "Desarrollo de Software"}
                        readOnly
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="ciclo">
                        Ciclo Actual
                    </Label>
                    <Input
                        id="ciclo"
                        value={perfil?.ciclo ? `${perfil.ciclo} Ciclo` : "-"}
                        readOnly
                    />
                </div>


                <div className="space-y-2">
                    <Label htmlFor="sede" className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" /> Sede
                    </Label>
                    <Input
                        id="sede"
                        value="Lima Centro"
                        readOnly
                    />
                </div>
            </div>
        </Card>
    );
}