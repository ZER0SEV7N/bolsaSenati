import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const distritosLima = [
  "Miraflores",
  "San Isidro",
  "Surco",
  "Barranco",
  "San Miguel",
  "La Molina",
  "Jesús María",
  "Lince",
  "Pueblo Libre",
  "Magdalena",
  "Los Olivos",
  "Comas",
  "San Juan de Lurigancho",
  "Ate",
  "Villa El Salvador"
]
export function DistritosAdicionales() {
  const [distrito1, setDistrito1] = useState("");

  const [distrito2, setDistrito2] = useState("");

  const [distrito3, setDistrito3] = useState("");

  return (
    <Card className="p-6 space-y-6">

      <div>
        <h2 className="text-x1 font-bold">
          Distritos Adicionales
        </h2>

        <p className="text-sm text-muted-foreground">
          Selecciona los distritos donde deseas trabajar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Distrito N°1
          </label>

          <Select onValueChange={setDistrito1}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona distrito" />
            </SelectTrigger>

            <SelectContent>
              {distritosLima.map((distrito) => (
                <SelectItem
                  key={distrito}
                  value={distrito}
                >
                  {distrito}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Distritos N°2
          </label>

          <Select onValueChange={setDistrito2}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona distrito" />
            </SelectTrigger>

            <SelectContent>
              {distritosLima.map((distrito) => (
                <SelectItem key={distrito} value={distrito}>
                  {distrito}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Distrito N°3
          </label>

          <Select onValueChange={setDistrito3}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona distrito" />
            </SelectTrigger>

            <SelectContent>
              {distritosLima.map((distrito) => (
                <SelectItem
                  key={distrito}
                  value={distrito}
                >
                  {distrito}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>

      <div className="space-y-3">
        <h3 className="font-semibold">
              Distritos seleccionados
        </h3>

        <div className="flex flex-wrap gap-2">
              {distrito1 && (
                <div className="px-3 py-2 rounded-md border text-sm">
                  {distrito1}
                </div>
              )}

              {distrito2 && (
                <div className="px-3 py-2 rounded-md border text-sm">
                  {distrito2}
                </div>
              )}

              {distrito3&& (
                <div className="px-3 py-2 rounded-md border text-sm">
                  {distrito3}
                </div>
              )}
        </div>
      </div>

    </Card>

  );
}