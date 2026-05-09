import { SectionCard } from "@/components/sectionCard";
import { ChartPieLegend } from "../../../components/charts/pieCharts";

function page() {
  return <div>
    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-5 ">
      <SectionCard
      title = "Tareas completadas"
      description = "Tareas completadas este mes"
      value = {12}/>

      <SectionCard
      title = "Tareas pendientes"
      description = "Tareas pendientes este mes"
      value = {21}/>

      <SectionCard
      title = "Promedio de Notas"
      description = "Promedio de notas este mes"
      value = {30}/>
    </div>
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-5 ">
      <ChartPieLegend />
      
    </div>

  </div>;
}

export default page;
