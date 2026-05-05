import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hook/auth";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useLogin();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleLogin(email, password);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <Card className="p-8">
        <CardHeader className="gap-4">
          <CardTitle className="text-3xl">
            Logueate con tu cuenta para acceder
          </CardTitle>
          <CardDescription className="text-base">
            Ingresa tu email a continuación para iniciar sesión en tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel htmlFor="email" className="text-base">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  className="h-12 text-base"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-base">
                    Contraseña
                  </FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </Field>
              <Button type="submit" className="h-12 text-base mt-4">
                Iniciar sesión
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
