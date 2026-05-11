import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { User } from "@/app/login/types/user";
type PersonalInfoProps = {
    perfil: User | null;
};

export function PersonalInfo({
    perfil,
}: PersonalInfoProps) {
    return (
        <Card className="p-6">
            <h2 className="font-bold text-lg">
                Información Personal
            </h2>
            <p className="text-sm text-muted-foreground">
                Datos de contacto y Ubicación
            </p>
            <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Nombre y apellidos
                    </p>

                    <Input className="font-medium"
                        value={`${perfil?.nombre || ""} ${perfil?.apellido || ""}`}
                        readOnly
                    />
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Telefono Móvil
                    </p>

                    <Input
                        value={perfil?.telefono || ""}
                        readOnly
                    />
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Correo Personal
                    </p>

                    <Input
                        value={perfil?.email || ""}
                        readOnly
                    />
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Distrito de Recidencia
                    </p>
                    <Input
                        value={perfil?.direccion || ""}
                        readOnly
                    />
                </div>
            </div>
        </Card>


    )
}