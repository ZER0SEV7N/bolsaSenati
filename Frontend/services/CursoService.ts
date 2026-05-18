import api from "../lib/config";

export const obtenerCursos = async (
  idAprendiz: number,
  idCarrera: number,
  ciclo: string,
) => {
  try {
    const response = await api.get(
      `/curso/filtrar?idAprendiz=${idAprendiz}&idCarrera=${idCarrera}&ciclo=${ciclo}`,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    throw error;
  }
};

export const actualizarOperacion = async (
  idAprendiz: number,
  idOperacion: number,
  estado: string,
) => {
  try {
    const response = await api.post("/operacion/guardar-progreso-operacion", {
      idAprendiz,
      idOperacion,
      estado,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar operación:", error);
    throw error;
  }
};
