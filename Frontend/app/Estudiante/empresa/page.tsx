"use client";

import { ColumnProps, GenericTable } from "@/components/table/GenericTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Building,
  Calendar,
  Eye,
  Mail,
  MapPin,
  Phone,
  Plus,
  SquareArrowOutUpRight,
} from "lucide-react";
import Image from "next/image";
import type { Empresa } from "@/types/Empresa";
import empresaData from "@/data/empresaData.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const data: Empresa[] = empresaData as Empresa[];

const columns: ColumnProps<Empresa>[] = [
  {
    key: "logoUrl",
    header: "Logo",
    render: (row: Empresa) => (
      <Avatar>
        <AvatarImage src={row.logoUrl} alt={row.razonSocial} />
        <AvatarFallback>{row.razonSocial.charAt(0)}</AvatarFallback>
      </Avatar>
    ),
  },
  { key: "razonSocial", header: "Razon Social" },
  {
    key: "periodo",
    header: "Periodo",
    render: (row: Empresa) => (
      <span className="flex items-center gap-1 text-sm ">
        <Calendar /> {row.periodoInicio} - {row.periodoFin}
      </span>
    ),
  },
  { key: "cargo", header: "Cargo" },
  // Acciones
  {
    key: "acciones",
    header: "Acciones",
    className: "text-right",
    render: (row) => (
      <div className="flex items-center justify-end gap-2">
        {/* Botón Ver */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1"
          onClick={() => alert("Ver detalles para empresa ID: " + row.id)}
        >
          <Eye size={14} />
          <span>Ver</span>
        </Button>

        {/* Botón Continuar Prácticas */}
        <Button
          variant="default" // O "secondary" según tu paleta
          size="sm"
          className="h-8 gap-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() =>
            alert("Continuar prácticas para empresa ID: " + row.id)
          }
        >
          <span>Continuar prácticas</span>
        </Button>
      </div>
    ),
  },
];

function EmpresaPage() {
  const route = useRouter();
  return (
    <div className="grid grid-cols-1 gap-4 px-4">
      <div className="flex items-center justify-between text-3xl font-bold py-4">
        <span>Informacion de Empresa</span>
        <Button
          variant="default"
          onClick={() => route.push("/Estudiante/empresa/create")}
          className="gap-2"
        >
          <Plus />
          Registrar Nueva Empresa
        </Button>
      </div>

      <Card className="px-4">
        <div className="mb-2 px-4">
          <h2 className="text-2xl font-bold ">Empresa Actual</h2>
          <p className="text-gray-600 mb-4">
            Descripción de la empresa donde realizas practicas actualmente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Empresa Actual */}
          <div className="px-4 pb-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/empresa.svg"
                alt="Logo"
                width={80}
                height={80}
                className="rounded-lg"
              />
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold">TechSolutions S.A.</h1>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={18} />
                  <span className="text-sm">Av. Principal 123, San Isidro</span>
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={18} />
                  <span className="text-sm">info@techsolutions.com</span>
                </p>
              </div>
            </div>
            {/* Detalles del Puesto y Fecha */}
            <div className="flex flex-col gap-1">
              <Card className="flex flex-row items-center px-2 py-1 w-fit gap-1.5">
                <Building size={16} className="shrink-0" />{" "}
                <span className="text-sm font-medium whitespace-nowrap">
                  Puesto: Desarrollador de Software
                </span>
              </Card>
              <Card className="flex flex-row items-center px-2 py-1 w-fit gap-1.5">
                <Calendar size={16} className="shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">
                  Fecha de Inicio: 01/01/2023
                </span>
              </Card>
            </div>
            {/* Botones de Acción */}
            <div className="flex flex-row items-center gap-3">
              <Button variant="outline" size="lg">
                Mapa
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <SquareArrowOutUpRight size={16} />
                Link Google
              </Button>
              <Button variant="outline" size="lg">
                Ver más
              </Button>
            </div>
          </div>
          {/* Datos del Monitor */}
          <div className="px-4">
            {/* Información del Monitor */}
            <div className="flex items-center gap-4">
              <Image
                src="/file.svg"
                alt="Logo"
                width={80}
                height={80}
                className="rounded-lg"
              />
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold">Monitor</h1>
                <p className="text-muted-foreground">
                  <span className="text-sm">Carlos Rodriguez</span>
                </p>
                <p className="text-muted-foreground">
                  <span className="text-sm">Jefe de Desarrollo</span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <p className="flex items-center gap-2 text-muted-foreground">
                <Mail size={18} />
                <span className="text-sm">
                  carlos.rodrigues@techsolutions.com
                </span>
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Phone size={18} />
                <span className="text-sm">+51 987 654 321</span>
              </p>
              <Button variant="outline" size="sm" className="w-fit gap-2">
                Ver más
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-2 px-4">
          <h2 className="text-2xl font-bold mb-2">Empresas Previas</h2>
          <p className="text-gray-600 mb-4">
            Historial de empresas donde has realizado practicas anteriormente.
          </p>
        </div>
        {/* Tabla de Empresas Previas */}
        <div className="px-4">
          <GenericTable columns={columns} data={data} />
        </div>
      </Card>
    </div>
  );
}

export default EmpresaPage;
