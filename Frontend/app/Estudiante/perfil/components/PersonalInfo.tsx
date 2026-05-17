import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/context";


export function PersonalInfo({
    perfil,
}: PersonalInfoProps) {
    const { user } = useAuth();
    const source = perfil || user;
    

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
                        value={`${source?.nombres || ""} ${source?.apellidos || ""}`}
                        readOnly
                    />
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Telefono Móvil
                    </p>

                    <Input
                        value={source?.telefono || ""}
                        readOnly
                    />
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Correo Personal
                    </p>

                    <Input
                        value={source?.correoPersonal || ""}
                        readOnly
                    />
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Distrito de Recidencia
                    </p>
                    <Input
                        value={source?.distrito || ""}
                        readOnly
                    />
                </div>
            </div>
        </Card>


    )
}