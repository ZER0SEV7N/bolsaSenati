import { Card } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { User } from "@/app/login/types/user";

import { Button } from "@/components/ui/button";

type ProfileCardProps = {
  perfil: User | null;
};

export function ProfileCard({
  perfil,
}: ProfileCardProps) {

  return (
    <Card className="p-6 flex flex-col items-center gap-4">

      <Avatar className="w-40 h-40">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>DN</AvatarFallback>
      </Avatar>

      <h2 className="text-xl font-bold">
        {perfil?.nombre} {perfil?.apellido}
      </h2>

      <Badge>
        Aprendiz
      </Badge>

      <Button variant="outline">
        Cambiar contraseña
      </Button>

      <div className="w-full">
        <h3 className="font-semibold">
          Palabras Clave
        </h3>

        <p className="text-sm text-muted-foreground">
          Habilidades y tecnologías que manejas
        </p>
      </div>

    </Card>
  );
}