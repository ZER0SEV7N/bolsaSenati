package com.bolsasenati.spring.models.payload;

import lombok.Data;
import java.util.List;

// DTO de respuesta para GET /dashboard/comentarios
// Contiene la lista de comentarios del instructor hacia el aprendiz
@Data
public class DashboardComentariosDTO {

    private List<ComentarioDTO> comentarios;

    @Data
    public static class ComentarioDTO {
        private String fecha;
        private Double calificacion;
        private String instructor;
        private String mensaje;
    }
}
