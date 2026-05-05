import { Badge } from "@/components/ui/badge"
import { SignupForm } from "@/app/aprendiz/perfil/components/signup-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CardImage() {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Estudiante</Badge>
        </CardAction>
        <CardTitle>Edson Leonardo Rojas Cabia</CardTitle>
        <CardDescription>
          Estudiante de senati
        </CardDescription>
      </CardHeader>
      <CardContent>
          <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
              <SignupForm />
            </div>
          </div>
      </CardContent>
    </Card>






  )
}
