package com.bolsasenati.spring.models.payload;

import lombok.Data;
import java.util.List;

// DTO de respuesta para GET /dashboard/calificacion
// Contiene el promedio, la ultima visita y el historial de visitas del aprendiz
@Data
public class DashboardCalificacionDTO {

    private Double promedio;
    private VisitaDTO ultimaVisita;
    private List<VisitaDTO> historialVisitas;

    @Data
    public static class VisitaDTO {
        private String fecha;
        private Integer nota;
        private String estado;
        private String instructor;
    }
}
