package com.bolsasenati.spring.controllers;

import com.bolsasenati.spring.models.payload.DashboardResumenDTO;
import com.bolsasenati.spring.models.payload.response;
import com.bolsasenati.spring.services.dashboard.dashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

// Controlador del dashboard del aprendiz
// Todas las rutas requieren autenticación (JWT) — configurado en SecurityConfig
@RestController
@RequestMapping("/dashboard")
public class dashboardController {

    @Autowired
    private dashboardService dashboardService;

    // GET /dashboard/resumen
    // Devuelve el resumen completo: promedio, tareas, operaciones y cumplimiento
    @GetMapping("/resumen")
    public ResponseEntity<response<DashboardResumenDTO>> getResumen() {
        try {
            // Obtener el correo del aprendiz autenticado desde el contexto de seguridad
            // (el jwtFilter ya validó el token y dejó el correo en SecurityContextHolder)
            String correo = SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

            DashboardResumenDTO resumen = dashboardService.getResumen(correo);

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
    // Devuelve solo la lista de tareas con su estado y progreso de operaciones
    @GetMapping("/tareas")
    public ResponseEntity<response<?>> getTareas() {
        try {
            String correo = SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

            DashboardResumenDTO resumen = dashboardService.getResumen(correo);

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
}
