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

    </Card>

  );
}