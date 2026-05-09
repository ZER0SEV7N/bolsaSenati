import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface sectionCardProps {
    title: string;
    description: string;
    value: number;
    icon?: React.ReactNode;
}

export function SectionCard({ title, description, value, icon }: sectionCardProps) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {icon}
            {description}
          </div>
        </CardFooter>
      </Card>
    )
}