import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-8 w-full max-w-md", className)} {...props}>
      <Card className="p-8">
        <CardHeader className="gap-4">
          <CardTitle className="text-3xl">Iniciar sesión</CardTitle>
          <CardDescription className="text-base">
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel htmlFor="email" className="text-base">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  className="h-12 text-base"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="contraseña" className="text-base">Contraseña</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input id="contraseña" type="contraseña" className="h-12 text-base" required />
              </Field>
              <Button type="submit" className="h-12 text-base mt-4">
                Iniciar sesión
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
