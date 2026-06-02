package com.bolsasenati.spring.models.Dashboard;

import lombok.Data;
import java.util.List;

// DTO de respuesta para GET /dashboard/tareas
// Se devuelve la lista de tareas con su estado para los tabs del frontend (todas, en progreso y completadas)
@Data
public class DashboardTareasDTO {

    private int totalTareas;
    private int tareasCompletadas;
    private int tareasPendientes;
    private List<TareaDetalleDTO> tareas;

    @Data
    public static class TareaDetalleDTO {
        private Integer id;
        private String nombre;
        private String curso;
        private int totalOperaciones;
        private int operacionesRealizadas;
        private String estado;
    }
}
