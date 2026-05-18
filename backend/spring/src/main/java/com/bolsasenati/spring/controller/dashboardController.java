package com.bolsasenati.spring.controller;

import com.bolsasenati.spring.models.payload.DashboardCalificacionDTO;
import com.bolsasenati.spring.models.payload.DashboardComentariosDTO;
import com.bolsasenati.spring.models.payload.DashboardResumenDTO;
import com.bolsasenati.spring.models.payload.response;
import com.bolsasenati.spring.services.dashboard.dashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

// Todas las rutas requieren autenticación JWT
@RestController
@RequestMapping("/dashboard")
public class dashboardController {

    @Autowired
    private dashboardService dashboardService;

    // Helper: obtiene el correo del aprendiz autenticado desde el JWT
    private String getCorreo() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    // GET /dashboard/resumen
    // Devuelve el resumen completo: promedio, tareas, operaciones y cumplimiento
    @GetMapping("/resumen")
    public ResponseEntity<response<DashboardResumenDTO>> getResumen() {
        try {
            DashboardResumenDTO resumen = dashboardService.getResumen(getCorreo());
            return ResponseEntity.ok(
                    new response<>(true, "Resumen obtenido correctamente", resumen));

        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    new response<>(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new response<>(false, "Error interno del servidor", null));
        }
    }

    // GET /dashboard/tareas
    // Devuelve solo la lista de tareas con su estado y progreso
    @GetMapping("/tareas")
    public ResponseEntity<response<?>> getTareas() {
        try {
            DashboardResumenDTO resumen = dashboardService.getResumen(getCorreo());
            return ResponseEntity.ok(
                    new response<>(true, "Tareas obtenidas correctamente", resumen.getTareas()));

        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    new response<>(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new response<>(false, "Error interno del servidor", null));
        }
    }

    // GET /dashboard/calificacion
    // Devuelve el promedio, la ultima visita y el historial de visitas
    @GetMapping("/calificacion")
    public ResponseEntity<response<DashboardCalificacionDTO>> getCalificacion() {
        try {
            DashboardCalificacionDTO data = dashboardService.getCalificacion(getCorreo());
            return ResponseEntity.ok(
                    new response<>(true, "Calificación obtenida correctamente", data));

        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    new response<>(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new response<>(false, "Error interno del servidor", null));
        }
    }

    // GET /dashboard/comentarios
    // Devuelve los comentarios del instructor hacia el aprendiz
    @GetMapping("/comentarios")
    public ResponseEntity<response<DashboardComentariosDTO>> getComentarios() {
        try {
            DashboardComentariosDTO data = dashboardService.getComentarios(getCorreo());
            return ResponseEntity.ok(
                    new response<>(true, "Comentarios obtenidos correctamente", data));

        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    new response<>(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new response<>(false, "Error interno del servidor", null));
        }
    }
}