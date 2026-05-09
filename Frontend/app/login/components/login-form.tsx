//frontend/app/login/components/login-form.tsx
//Componente de formulario de inicio de sesion - SHADCN 
'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hook/auth";
import { useState } from "react";
import { Eye } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useLogin();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleLogin(email, password);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Card className="overflow-hidden border-border/60 bg-card/95 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl">
        <CardContent className="pt-4">
          <form onSubmit={onSubmit} className="space-y-5">
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel htmlFor="email" className="text-sm font-medium text-foreground/90">
                  Correo institucional
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="1234567@senati.pe"
                  className="h-12 rounded-xl border-border/70 bg-background/80 px-4 text-[15px] shadow-sm transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center gap-3">
                  <FieldLabel htmlFor="password" className="text-sm font-medium text-foreground/90">
                    Contraseña
                  </FieldLabel>
                  <a href="#" className="ml-auto inline-block text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="***********"
                    className="h-12 rounded-xl border-border/70 bg-background/80 px-4 pr-12 text-[15px] shadow-sm transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label="Mostrar contraseña"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="recuerdame"
                  name="recuerdame"
                  className=" "
                />
                <Label htmlFor="recuerdame">Recordarme</Label>
              </Field>

              <Button type="submit" className="h-12 rounded-xl bg-primary text-base font-semibold shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25">
                Iniciar sesión
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
