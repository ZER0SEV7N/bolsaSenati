import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AprendizPerfil } from "../hook/usePerfil";
import { Edit2, Save, X, Phone, Mail, IdCard, User, UsersRound } from "lucide-react";


type PersonalInfoProps = {
    perfil: AprendizPerfil | null;
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
    handleChange: (field: keyof AprendizPerfil, value: string) => void;
    guardarContacto?: (telefono: string, correoPersonal: string) => Promise<boolean>;
};

export function PersonalInfo({ perfil, isEditing, setIsEditing, handleChange, guardarContacto }: PersonalInfoProps) {
    
    const handleGuardarDatos = async () => {
        if (guardarContacto && perfil) {
            const exito = await guardarContacto(perfil.telefono, perfil.correoPersonal);
            if (exito) {
                setIsEditing(false);
            }
        } else {
            setIsEditing(false);
        }
    };

    return (
        <Card className="p-6">
            <div className="flex justify-between items-start mb-6">




                <div>
                    <h2 className="font-bold text-lg flex items-center gap-2">
                        <UsersRound className="w-5 h-5 text-muted-foreground" /> Información Personal
                    </h2>
                    <p className="text-sm text-muted-foreground">Datos de contacto y Ubicación</p>
                </div>
                
                {/* Lógica del Botón: Si está editando muestra Guardar/Cancelar, sino muestra Editar */}
                {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit2 className="w-4 h-4 mr-2" /> Editar Contacto
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                            <X className="w-4 h-4 mr-2" /> Cancelar
                        </Button>
                        <Button size="sm" onClick={handleGuardarDatos}>
                            <Save className="w-4 h-4 mr-2" /> Guardar
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        <User className="w-4 h-4" /> Nombre y apellidos
                    </p>
                    <Input 
                        className="font-medium bg-muted/50"
                        value={perfil ? `${perfil.nombres} ${perfil.apellidos}` : ""}
                        readOnly
                    />
                </div>

                
                <div>
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Teléfono Móvil
                    </p>


                    <Input
                        value={perfil?.telefono || ""}
                        onChange={(e) => handleChange("telefono", e.target.value)}
                        readOnly={!isEditing} // Se bloquea si no está en modo edición
                        className={isEditing ? "border-primary" : "bg-muted/50"}
                    />
                </div>

                {/* CORREO PERSONAL (Editable si isEditing es true) */}
                <div>
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Correo Personal
                    </p>


                    <Input
                        value={perfil?.correoPersonal || ""}
                        onChange={(e) => handleChange("correoPersonal", e.target.value)}
                        readOnly={!isEditing}
                        className={isEditing ? "border-primary" : "bg-muted/50"}
                    />
                </div>

                {/* DOCUMENTO (Siempre bloqueado) */}
                <div>
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        <IdCard className="w-4 h-4" /> Documento de Identidad
                    </p>


                    <Input
                        value={perfil?.documentoIdentidad || ""}
                        readOnly
                        className="bg-muted/50"
                    />
                </div>
            </div>
        </Card>
    );
}