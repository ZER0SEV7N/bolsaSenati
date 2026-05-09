//bolsasenati/app/page.tsx
//Page de login, utilizando componentes de UI personalizados para el formulario de inicio de sesión.
import { LoginForm } from "@/app/login/components/login-form"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* Titulo y foto */}
        <div className="flex flex-col items-center gap-6">
            <Image src="/Senati_logo_completo.png" alt="Logo senati" width={200} height={200} className="w-80 h-auto" />
            <Label className="text-2xl font-bold text-center">Bienvenido</Label>
            <Label className="text-sm text-center text-muted-foreground padding-y-2">Inicia sesión para continuar con tu cuenta de senati</Label>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};