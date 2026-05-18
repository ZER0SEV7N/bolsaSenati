"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const ofertas = [
  {
    id: 1,
    empresa: "Intercorp",
    puesto: "Practicante Frontend",
    pea: "Ingeniería de Software",
    distrito: "San Isidro",
  },

  {
    id: 2,
    empresa: "Backus",
    puesto: "Soporte TI",
    pea: "Redes y Comunicaciones",
    distrito: "Ate",
  },

  {
    id: 3,
    empresa: "BCP",
    puesto: "Desarrollador Junior",
    pea: "Ingeniería de Software",
    distrito: "La Molina",
  },
];

export default function BolsaTrabajo() {

  const [buscar, setBuscar] = useState("");

  const resultados = useMemo(() => {

    return ofertas.filter((item) =>
      item.empresa
        .toLowerCase()
        .includes(buscar.toLowerCase())
    );

  }, [buscar]);

  return (

    <div className="p-8">

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          Bolsa de Trabajo
        </h1>

        <p className="text-gray-500">
          Encuentra oportunidades según tu PEA
        </p>

      </div>


      <div className="relative max-w-lg mb-8">

        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Buscar empresa..."
          value={buscar}
          onChange={(e)=>setBuscar(e.target.value)}
          className="
          w-full
          border
          rounded-xl
          pl-10
          py-3
          outline-none
          focus:ring-2
          "
        />

      </div>


      <div className="grid gap-4">

        {resultados.map((empresa)=>(

          <div
            key={empresa.id}
            className="
            border
            rounded-xl
            p-5
            shadow-sm
            hover:shadow-lg
            transition
            "
          >

            <h2 className="font-bold text-xl">
              {empresa.empresa}
            </h2>

            <p>
              {empresa.puesto}
            </p>

            <p className="text-sm text-gray-500">
              PEA: {empresa.pea}
            </p>

            <p className="text-sm">
              Distrito: {empresa.distrito}
            </p>

            <button
             className="
             mt-4
             px-4
             py-2
             rounded-lg
             bg-black
             text-white
             "
            >

             Ver información

            </button>

          </div>

        ))}


        {resultados.length===0 &&(

          <div>

            No se encontraron empresas

          </div>

        )}

      </div>

    </div>

  );

}