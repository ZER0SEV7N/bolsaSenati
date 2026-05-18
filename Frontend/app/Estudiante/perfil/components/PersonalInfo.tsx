import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AprendizPerfil } from "../hook/usePerfil";

type PersonalInfoProps = {
    perfil: AprendizPerfil | null;
};

export function PersonalInfo({ perfil }: PersonalInfoProps) {
    return (
        <Card className="p-6">
            <h2 className="font-bold text-lg">
                Información Personal
            </h2>
            <p className="text-sm text-muted-foreground">
                Datos de contacto y Ubicación
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <p className="text-sm text-muted-foreground mb-1">
                        Nombre y apellidos
                    </p>
                    <Input 
                        className="font-medium"
                        value={perfil ? `${perfil.nombres} ${perfil.apellidos}` : ""}
                        readOnly
                    />
                </div>

                <div>
                    <p className="text-sm text-muted-foreground mb-1">
                        Teléfono Móvil
                    </p>
                    <Input
                        value={perfil?.telefono || ""}
                        readOnly
                    />
                </div>

                <div>
                    <p className="text-sm text-muted-foreground mb-1">
                        Correo Personal
                    </p>
                    <Input
                        value={perfil?.correoPersonal || ""}
                        readOnly
                    />
                </div>

                <div>
                    <p className="text-sm text-muted-foreground mb-1">
                        Documento de Identidad
                    </p>
                    <Input
                        value={perfil?.documentoIdentidad || ""}
                        readOnly
                    />
                </div>
            </div>
        </Card>
    );
}