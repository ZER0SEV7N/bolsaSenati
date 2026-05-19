// frontend/app/Estudiante/perfil/components/DistritosAdicionales.tsx
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, X } from "lucide-react";

type DistritosAdicionalesProps = {
  distritos: string[];
  agregarDistrito: (distrito: string) => void;
  eliminarDistrito: (distrito: string) => void;
  guardarIntereses: () => void;
  catalogoDistritos: { id: number; distrito: string }[];
  hayCambiosSinGuardar: boolean;
};

export function DistritosAdicionales({
  distritos,
  agregarDistrito,
  eliminarDistrito,
  guardarIntereses,
  catalogoDistritos,
  hayCambiosSinGuardar
}: DistritosAdicionalesProps) {

  const distritosDisponibles = catalogoDistritos.filter(
    (d) => !distritos.includes(d.distrito)
  );
  
  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Zonas de Interés</h2>
          <p className="text-sm text-muted-foreground">
            Selecciona los distritos donde estás dispuesto a trabajar o hacer prácticas.
          </p>
        </div>
        
        {hayCambiosSinGuardar && (
          <Button onClick={guardarIntereses} className="flex gap-2 bg-blue-600 hover:bg-blue-700 animate-in fade-in zoom-in duration-300">
            <Save className="w-4 h-4" />
            Guardar Cambios
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Un solo Select Dinámico */}
        <div className="max-w-md">
          <Select 
            value="" // Siempre mostramos el placeholder después de elegir
            onValueChange={(val) => agregarDistrito(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Agregar un distrito..." />
            </SelectTrigger>
            <SelectContent>
              {distritosDisponibles.length > 0 ? (
                distritosDisponibles.map((item) => (
                  <SelectItem key={item.id} value={item.distrito}>
                    {item.distrito}
                  </SelectItem>
                ))
              ) : (
                <p className="p-2 text-sm text-muted-foreground text-center">Todos seleccionados</p>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Chips de Distritos Seleccionados */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-semibold text-muted-foreground">Distritos seleccionados ({distritos.length})</h3>
          
          <div className="flex flex-wrap gap-2">
            {distritos.map((distrito, idx) => (
              <Badge key={idx} variant="secondary" className="flex items-center gap-1 py-1.5 px-3 text-sm">
                {distrito}
                <button 
                  type="button" 
                  onClick={() => eliminarDistrito(distrito)} 
                  className="ml-1 text-muted-foreground hover:text-destructive rounded-full transition-colors focus:outline-none"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </Badge>
            ))}
            
            {distritos.length === 0 && (
               <p className="text-sm text-muted-foreground italic">No has agregado ningún distrito.</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}