//bolsasenati/app/page.tsx
//Page de login, utilizando componentes de UI personalizados para el formulario de inicio de sesión.
import { LoginForm } from "@/app/login/components/login-form"
import { Card } from "@/components/ui/card"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}


