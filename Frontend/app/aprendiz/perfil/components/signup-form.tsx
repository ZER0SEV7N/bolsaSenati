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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Editar cuenta</CardTitle>
        <CardDescription>
          Midificar datos de perfil
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nombre</FieldLabel>
              <Input id="nombre" type="text" disabled />
            </Field>
            <Field>
              <FieldLabel htmlFor="apellido">Apellido</FieldLabel>
              <input id="apellido" type="text" disabled/>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Correo</FieldLabel>
              <Input
                id="email"
                type="email"
                disabled
              />
              <FieldDescription>
                Estos datos no son modificables
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input id="contraseña" type="password" required />
              <FieldDescription>
                Escribe una contraseña mas de 8 digitos 
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                confirma cambios de contraseña
              </FieldLabel>
              <Input id="confirmar-constraseña" type="password" required />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
