"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, User } from "lucide-react";
import { useEmpresa } from "@/hooks/useEmpresa"; // Importa tu nuevo hook

function Page() {
  const {
    activeTab,
    formData,
    handleChange,
    handleNext,
    handleFinish,
    handleCancel,
    handleBack,
  } = useEmpresa();

  return (
    <div className="grid grid-cols-1 gap-4 px-4 py-6 w-full">
      <span className="text-3xl font-bold">Registrar Nueva Empresa</span>

      <Card className="p-6 w-full">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Configuración de Registro</h2>
          <p className="text-sm text-muted-foreground">
            Ingresa la información requerida para continuar.
          </p>
        </div>

        <div className="w-full">
          <Tabs value={activeTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="personal"
                disabled={activeTab !== "personal"}
                className="flex gap-2"
              >
                <Building className="h-4 w-4" /> Información de Empresa
              </TabsTrigger>
              <TabsTrigger
                value="empresa"
                disabled={activeTab !== "empresa"}
                className="flex gap-2"
              >
                <User className="h-4 w-4" /> Información de Monitor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="razonSocial">Razón Social</Label>
                    <Input
                      id="razonSocial"
                      value={formData.razonSocial}
                      onChange={handleChange}
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                      id="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      placeholder="Av. Ejemplo 123"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkGoogleMaps">Link de Google Maps</Label>
                    <Input
                      id="linkGoogleMaps"
                      value={formData.linkGoogleMaps}
                      onChange={handleChange}
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                    <Input
                      id="fechaInicio"
                      type="date"
                      value={formData.fechaInicio}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@empresa.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="distrito">Distrito</Label>
                    <Input
                      id="distrito"
                      value={formData.distrito}
                      onChange={handleChange}
                      placeholder="San Isidro"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="puestoAprendiz">Puesto de Aprendiz</Label>
                    <Input
                      id="puestoAprendiz"
                      value={formData.puestoAprendiz}
                      onChange={handleChange}
                      placeholder="Desarrollador Web Junior"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoEmpresa">Logo de Empresa</Label>
                    <Input
                      id="logoEmpresa"
                      value={formData.logoEmpresa}
                      onChange={handleChange}
                      placeholder="URL del logo o nombre de archivo"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button onClick={handleNext}>Siguiente Paso</Button>
              </div>
            </TabsContent>

            <TabsContent value="empresa" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre y Apellido</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ruc">RUC</Label>
                  <Input
                    id="ruc"
                    value={formData.ruc}
                    onChange={handleChange}
                    placeholder="20123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dni">DNI</Label>
                  <Input
                    id="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    placeholder="70123456"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    placeholder="Gerente / Supervisor"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handleBack}>
                  Atrás
                </Button>
                <Button onClick={handleFinish}>Finalizar Registro</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}

export default Page;
