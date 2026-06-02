package com.bolsasenati.spring.models.Dashboard;

import lombok.Data;
import java.util.List;

@Data
public class DashboardResumenDTO {

    private String nombres;
    private String apellidos;
    private Double promedio;
    private int totalTareas;
    private int tareasCompletadas;
    private int tareasPendientes;
    private int totalOperaciones;
    private int operacionesRealizadas;
    private int operacionesPendientes;
    private double porcentajeCumplimiento;
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
