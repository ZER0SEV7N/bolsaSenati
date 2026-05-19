import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AprendizPerfil } from "../hook/usePerfil";
import { User, Phone, Mail, MapPin, UsersRound } from "lucide-react";
import { Label } from "@/components/ui/label";

type PersonalInfoProps = {
    perfil: AprendizPerfil | null;
};

export function PersonalInfo({ perfil }: PersonalInfoProps) {
    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
                <UsersRound className="w-5 h-5 text-muted-foreground" />
                Información Personal
            </h2>
            <p className="text-sm text-muted-foreground">
                Datos de contacto y Ubicación
            </p>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">

                    <p className="text-sm text-muted-foreground mb-1">
                        Nombre y apellidos
                    </p>

                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        className="font-medium"
                        value={perfil ? `${perfil.nombres} ${perfil.apellidos}` : ""}
                        readOnly
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="telefono" className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" /> {/* Al costado de la palabra */}
                        Teléfono Móvil
                    </Label>
                    <Input
                        id="telefono"
                        value={perfil?.telefono || "999999999"}
                        readOnly
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="correo" className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" /> {/* Al costado de la palabra */}
                        Correo Personal
                    </Label>
                    <Input
                        id="correo"
                        value={perfil?.correoPersonal || "Aprendiz@gmail.com"}
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