package com.bolsasenati.spring.models.Dashboard;

import lombok.Data;

// DTO de respuesta para GET /dashboard/avance-pea
// Se devuelve unicamente los numeros de cumplimiento, sin el detalle de tareas
@Data
public class DashboardAvancePeaDTO {

    private double porcentajeCumplimiento;

    private int totalTareas;
    private int tareasCompletadas;
    private int tareasPendientes;

    private int totalOperaciones;
    private int operacionesRealizadas;
    private int operacionesPendientes;
}
