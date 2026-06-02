package com.bolsasenati.spring.controller;

import com.bolsasenati.spring.models.Dashboard.DashboardAvancePeaDTO;
import com.bolsasenati.spring.models.Dashboard.DashboardCalificacionDTO;
import com.bolsasenati.spring.models.Dashboard.DashboardComentariosDTO;
import com.bolsasenati.spring.models.Dashboard.DashboardResumenDTO;
import com.bolsasenati.spring.models.Dashboard.DashboardTareasDTO;
import com.bolsasenati.spring.util.Response;
import com.bolsasenati.spring.services.dashboard.dashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

//Controlador para manejar las rutas relacionadas al dashboard del aprendiz
//Todas las rutas requieren autenticación y devuelven información personalizada según el aprendiz autenticado
@RestController
@RequestMapping("/dashboard")
public class dashboardController {

    @Autowired
    private dashboardService dashboardService;

    // Método auxiliar para obtener el correo del usuario autenticado
    private String getCorreo() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    //Endpoint GET: /dashboard/resumen
    //Devuelve un resumen del estado actual del aprendiz, incluyendo su avance general, 
    //calificación y próximos pasos recomendados
    @GetMapping("/resumen")
    public ResponseEntity<Response<DashboardResumenDTO>> getResumen() {
        DashboardResumenDTO resumen = dashboardService.getResumen(getCorreo());
        return ResponseEntity.ok(new Response<>(true, "Resumen obtenido correctamente", resumen));
        
    }

    //Endpoint GET: /dashboard/avance-pea
    //Devuelve el avance del aprendiz en su PEA actual, con porcentaje de avance y próximos pasos recomendados
    @GetMapping("/avance-pea")
    public ResponseEntity<Response<DashboardAvancePeaDTO>> getAvancePea() {
        DashboardAvancePeaDTO data = dashboardService.getAvancePea(getCorreo());
        return ResponseEntity.ok(new Response<>(true, "Avance PEA obtenido correctamente", data));
    }

    //Endpoint GET: /dashboard/tareas
    //Devuelve la lista de tareas del aprendiz, con su estado (completada o pendiente) 
    //y el progreso (operaciones realizadas vs total de operaciones)
    @GetMapping("/tareas")
    public ResponseEntity<Response<DashboardTareasDTO>> getTareas() {
        DashboardTareasDTO data = dashboardService.getTareas(getCorreo());
        return ResponseEntity.ok(new Response<>(true, "Tareas obtenidas correctamente", data));
    }

    //Endpoint GET: /dashboard/calificacion
    //Devuelve la calificación general del aprendiz, calculada a partir de sus tareas y 
    //visitas a la plataforma, además de su historial de visitas (fecha, nota, estado, instructor)
    @GetMapping("/calificacion")
    public ResponseEntity<Response<DashboardCalificacionDTO>> getCalificacion() {   
        DashboardCalificacionDTO data = dashboardService.getCalificacion(getCorreo());
        return ResponseEntity.ok(new Response<>(true, "Calificación obtenida correctamente", data));
    }

    //Endpoint GET: /dashboard/comentarios
    //Devuelve los comentarios relacionados al aprendiz
    @GetMapping("/comentarios")
    public ResponseEntity<Response<DashboardComentariosDTO>> getComentarios() {
            DashboardComentariosDTO data = dashboardService.getComentarios(getCorreo());
            return ResponseEntity.ok(new Response<>(true, "Comentarios obtenidos correctamente", data));
    }
}