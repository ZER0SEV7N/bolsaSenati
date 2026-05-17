package com.bolsasenati.spring.services.dashboard;

import com.bolsasenati.spring.models.Aprendiz;
import com.bolsasenati.spring.models.ProgresoOperacion;
import com.bolsasenati.spring.models.Tarea;
import com.bolsasenati.spring.models.payload.DashboardResumenDTO;
import com.bolsasenati.spring.models.payload.DashboardResumenDTO.TareaDetalleDTO;
import com.bolsasenati.spring.repository.dashboard.progresoOperacionRepository;
import com.bolsasenati.spring.repository.usuarios.aprendizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

// Servicio del dashboard: calcula el resumen de progreso del aprendiz autenticado
@Service
public class dashboardService {

    @Autowired
    private progresoOperacionRepository progresoRepo;

    @Autowired
    private aprendizRepository aprendizRepo;

    // Obtiene el resumen completo del dashboard dado el correo del aprendiz
    public DashboardResumenDTO getResumen(String correo) {

        // Buscar aprendiz por su correo institucional (igual que hace authServices)
        Aprendiz aprendiz = aprendizRepo.findByCorreoInstitucional(correo);

        if (aprendiz == null)
            throw new RuntimeException("Aprendiz no encontrado");

        Integer idAprendiz = aprendiz.getIdaprendiz();

        // Traer todas las operaciones con sus relaciones cargadas
        List<ProgresoOperacion> progresos = progresoRepo.findByAprendizIdWithDetails(idAprendiz);

        long totalOperaciones = progresos.size();
        long operacionesRealizadas = progresos.stream()
                .filter(p -> p.getEstado() == ProgresoOperacion.EstadoOperacion.realizado)
                .count();
        long operacionesPendientes = totalOperaciones - operacionesRealizadas;

        // Agrupar por tarea para calcular el estado de cada una
        Map<Tarea, List<ProgresoOperacion>> porTarea = progresos.stream()
                .collect(Collectors.groupingBy(p -> p.getOperacion().getTarea()));

        List<TareaDetalleDTO> tareasDetalle = new ArrayList<>();
        int tareasCompletadas = 0;

        for (Map.Entry<Tarea, List<ProgresoOperacion>> entry : porTarea.entrySet()) {
            Tarea tarea = entry.getKey();
            List<ProgresoOperacion> ops = entry.getValue();

            int totalOps = ops.size();
            int realizadas = (int) ops.stream()
                    .filter(p -> p.getEstado() == ProgresoOperacion.EstadoOperacion.realizado)
                    .count();

            boolean completada = totalOps > 0 && totalOps == realizadas;
            if (completada)
                tareasCompletadas++;

            TareaDetalleDTO dto = new TareaDetalleDTO();
            dto.setId(tarea.getId());
            dto.setNombre(tarea.getNombre());
            dto.setCurso(tarea.getCurso().getNombre());
            dto.setTotalOperaciones(totalOps);
            dto.setOperacionesRealizadas(realizadas);
            dto.setEstado(completada ? "completada" : "en progreso");
            tareasDetalle.add(dto);
        }

        int totalTareas = tareasDetalle.size();
        int tareasPendientes = totalTareas - tareasCompletadas;

        // Porcentaje de cumplimiento basado en operaciones realizadas
        double porcentaje = totalOperaciones > 0
                ? Math.round((operacionesRealizadas * 100.0 / totalOperaciones) * 10.0) / 10.0
                : 0.0;

        // Promedio estimado (ajustar cuando exista tabla de calificaciones)
        double promedio = porcentaje >= 90 ? 19.0
                : porcentaje >= 70 ? 17.0
                        : porcentaje >= 50 ? 14.0
                                : 11.0;

        // Armar y retornar el DTO de respuesta
        DashboardResumenDTO resumen = new DashboardResumenDTO();
        resumen.setNombres(aprendiz.getUsuario().getNombres());
        resumen.setApellidos(aprendiz.getUsuario().getApellidos());
        resumen.setPromedio(promedio);
        resumen.setTotalTareas(totalTareas);
        resumen.setTareasCompletadas(tareasCompletadas);
        resumen.setTareasPendientes(tareasPendientes);
        resumen.setTotalOperaciones((int) totalOperaciones);
        resumen.setOperacionesRealizadas((int) operacionesRealizadas);
        resumen.setOperacionesPendientes((int) operacionesPendientes);
        resumen.setPorcentajeCumplimiento(porcentaje);
        resumen.setTareas(tareasDetalle);

        return resumen;
    }
}
