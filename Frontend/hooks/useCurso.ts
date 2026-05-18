import { Curso } from "@/types/Curso";
import { useEffect, useState } from "react";
import { obtenerCursos, actualizarOperacion } from "../services/CursoService";
import { useAuth } from "@/context/context";

export const useCurso = () => {
  const [cursos, setCursos] = useState<Curso[] | null>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        if (!user) throw new Error("Usuario no autenticado");

        const cursosData = await obtenerCursos(
          user?.id,
          user?.carreraDto?.id,
          "IV",
        );
        setCursos(cursosData);
      } catch (error) {
        console.error("Error al obtener cursos:", error);
      }
    };

    fetchCursos();
  }, [user]);

  const operacionEstado = async (idOperacion: number) => {
    try {
      if (!user || !user.id) throw new Error("Usuario no autenticado");

      let estadoActual = "pendiente";

      cursos?.forEach((curso) => {
        curso.tareas?.forEach((tarea) => {
          const op = tarea.operaciones?.find(
            (o) => Number(o.id) === idOperacion,
          );
          if (op) {
            estadoActual = op.estado ?? "pendiente";
          }
        });
      });

      const nuevoEstado =
        estadoActual === "realizado" ? "pendiente" : "realizado";

      setCursos((prevCursos) => {
        if (!prevCursos) return null;
        return prevCursos.map((curso) => ({
          ...curso,
          tareas: curso.tareas.map((tarea) => ({
            ...tarea,
            operaciones: tarea.operaciones.map((op) =>
              Number(op.id) === idOperacion
                ? { ...op, estado: nuevoEstado }
                : op,
            ),
          })),
        }));
      });

      const result = await actualizarOperacion(
        user.id,
        idOperacion,
        nuevoEstado,
      );

      return result;
    } catch (error) {
      console.error("Error al actualizar operación:", error);

      if (!user) {
        console.error("Usuario no autenticado");
        return;
      }

      const coursesData = await obtenerCursos(
        user?.id,
        user?.carreraDto?.id,
        "IV",
      );
      setCursos(coursesData);
      throw error;
    }
  };

  return { cursos, operacionEstado };
};
