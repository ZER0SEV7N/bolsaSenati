//frontend/app/login/components/login-form.tsx
//Componente de formulario de inicio de sesion - SHADCN 
'use client'
//Importaciones
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hook/auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

//Componente principal del formulario de inicio de sesión 
export function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const {handleLogin, error, isSubmitting } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(correo, password);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Card className="overflow-hidden border-border/60 bg-card/95 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl">
        <CardContent className="pt-4">
          <form onSubmit={onSubmit} className="space-y-5">
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel htmlFor="correo" className="text-sm font-medium text-foreground/90">
                  Correo institucional
                </FieldLabel>
                <Input
                  id="correo"
                  type="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="1234567@senati.pe"
                  className="h-12 rounded-xl border-border/70 bg-background/80 px-4 text-[15px] shadow-sm transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20"
                  required
                  disabled={isSubmitting} //Deshabilita el input mientras carga
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
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="***********"
                    className="h-12 rounded-xl border-border/70 bg-background/80 px-4 pr-12 text-[15px] shadow-sm transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20"
                    required
                    disabled={isSubmitting} //Deshabilita el input mientras carga
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label="Mostrar contraseña"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="recuerdame" name="recuerdame" disabled={isSubmitting} />
                <Label htmlFor="recuerdame">Recordarme</Label>
              </Field>

              {/* Mostrar mensaje de error del backend */}
              {error && (
                <div className="text-sm text-destructive font-medium">
                  {error}
                </div>
              )}

              {/* Botón dinámico */}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="h-12 rounded-xl bg-primary text-base font-semibold shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}