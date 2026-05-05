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
        <div className="flex flex-col items-center gap-4">
            <Image src="/senati-logo.png" alt="Logo senati" width={120} height={120} className="w-32 h-auto" />
            <Label className="text-2xl font-bold text-center">Bienvenido a la bolsa de trabajo de SENATI</Label>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};