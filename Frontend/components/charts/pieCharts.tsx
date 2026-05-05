"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A pie chart with a legend"

const chartData = [
  { tareas: "Completadas", cantidad: 275, fill: "var(--chart-1)" },
  { tareas: "Pendientes", cantidad: 200, fill: "var(--chart-2)" },
  { tareas: "En progreso", cantidad: 187, fill: "var(--chart-3)" },
]

const chartConfig = {
  cantidad: {
    label: "Tareas",
  },
  Pendientes: {
    label: "Pendientes",
    color: "var(--chart-1)",
  },
  "En progreso": {
    label: "En progreso",
    color: "var(--chart-2)",
  },
  "Completadas": {
    label: "Completadas",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function ChartPieLegend() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="cantidad" />
            <ChartLegend
              content={<ChartLegendContent nameKey="tareas" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
