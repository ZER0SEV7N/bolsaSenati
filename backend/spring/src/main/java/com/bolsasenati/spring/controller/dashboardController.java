package com.bolsasenati.spring.controller;

import com.bolsasenati.spring.models.payload.DashboardAvancePeaDTO;
import com.bolsasenati.spring.models.payload.DashboardCalificacionDTO;
import com.bolsasenati.spring.models.payload.DashboardComentariosDTO;
import com.bolsasenati.spring.models.payload.DashboardResumenDTO;
import com.bolsasenati.spring.models.payload.DashboardTareasDTO;
import com.bolsasenati.spring.models.payload.response;
import com.bolsasenati.spring.services.dashboard.dashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
public class dashboardController {

    @Autowired
    private dashboardService dashboardService;

    private String getCorreo() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    // 1. RESUMEN
    @GetMapping("/resumen")
    public ResponseEntity<response<DashboardResumenDTO>> getResumen() {
        try {
            DashboardResumenDTO resumen = dashboardService.getResumen(getCorreo());
            return ResponseEntity.ok(new response<>(true, "Resumen obtenido correctamente", resumen));
        } catch (RuntimeException e) {
            e.printStackTrace(); // <--- AGREGADO
            return ResponseEntity.status(500).body(new response<>(false, "Error: " + e.getMessage(), null)); // <--- Cambiado a 500
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new response<>(false, "Error interno del servidor", null));
        }
    }

    // 2. AVANCE PEA
    @GetMapping("/avance-pea")
    public ResponseEntity<response<DashboardAvancePeaDTO>> getAvancePea() {
        try {
            DashboardAvancePeaDTO data = dashboardService.getAvancePea(getCorreo());
            return ResponseEntity.ok(new response<>(true, "Avance PEA obtenido correctamente", data));
        } catch (RuntimeException e) {
            e.printStackTrace(); // <--- AGREGADO
            return ResponseEntity.status(500).body(new response<>(false, "Error: " + e.getMessage(), null)); // <--- Cambiado a 500
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new response<>(false, "Error interno del servidor", null));
        }
    }

    // 3. TAREAS
    @GetMapping("/tareas")
    public ResponseEntity<response<DashboardTareasDTO>> getTareas() {
        try {
            DashboardTareasDTO data = dashboardService.getTareas(getCorreo());
            return ResponseEntity.ok(new response<>(true, "Tareas obtenidas correctamente", data));
        } catch (RuntimeException e) {
            e.printStackTrace(); // <--- AGREGADO
            return ResponseEntity.status(500).body(new response<>(false, "Error: " + e.getMessage(), null)); // <--- Cambiado a 500
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new response<>(false, "Error interno del servidor", null));
        }
    }

    // 4. CALIFICACION
    @GetMapping("/calificacion")
    public ResponseEntity<response<DashboardCalificacionDTO>> getCalificacion() {
        try {
            DashboardCalificacionDTO data = dashboardService.getCalificacion(getCorreo());
            return ResponseEntity.ok(new response<>(true, "Calificación obtenida correctamente", data));
        } catch (RuntimeException e) { 
            e.printStackTrace();
            return ResponseEntity.status(500).body(new response<>(false, "Error interno del servidor", null));
        }
    }

    // 5. COMENTARIOS
    @GetMapping("/comentarios")
    public ResponseEntity<response<DashboardComentariosDTO>> getComentarios() {
        try {
            DashboardComentariosDTO data = dashboardService.getComentarios(getCorreo());
            return ResponseEntity.ok(new response<>(true, "Comentarios obtenidos correctamente", data));
        } catch (RuntimeException e) {
            e.printStackTrace(); // <--- AGREGADO
            return ResponseEntity.status(500).body(new response<>(false, "Error: " + e.getMessage(), null)); // <--- Cambiado a 500
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new response<>(false, "Error interno del servidor", null));
        }
    }
}