package com.bolsasenati.spring.services;

import com.bolsasenati.spring.models.Aprendiz;
import com.bolsasenati.spring.models.ProgresoOperacion;
import com.bolsasenati.spring.models.Tarea;
import com.bolsasenati.spring.models.payload.DashboardResumenDTO;
import com.bolsasenati.spring.models.payload.DashboardResumenDTO.TareaDetalleDTO;
import com.bolsasenati.spring.repository.AprendizRepository;
import com.bolsasenati.spring.repository.ProgresoOperacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private ProgresoOperacionRepository progresoRepo;

    @Autowired
    private AprendizRepository aprendizRepo;

    public DashboardResumenDTO getResumen(Integer idAprendiz) {

        // Buscar aprendiz
        Aprendiz aprendiz = aprendizRepo.findByUsuarioId(idAprendiz)
                .orElseThrow(() -> new RuntimeException("Aprendiz no encontrado"));

        // Traer todas las operaciones del aprendiz con detalles
        List<ProgresoOperacion> progresos = progresoRepo.findByAprendizIdWithDetails(idAprendiz);

        long totalOperaciones = progresos.size();
        long operacionesRealizadas = progresos.stream()
                .filter(p -> p.getEstado() == ProgresoOperacion.EstadoOperacion.realizado)
                .count();
        long operacionesPendientes = totalOperaciones - operacionesRealizadas;

        // Agrupar operaciones por tarea
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

        // Promedio simulado (ajustar cuando exista tabla de calificaciones)
        double promedio = porcentaje >= 90 ? 19.0
                : porcentaje >= 70 ? 17.0
                        : porcentaje >= 50 ? 14.0
                                : 11.0;

        // Armar respuesta
        DashboardResumenDTO resumen = new DashboardResumenDTO();
        resumen.setNombres(aprendiz.getNombres());
        resumen.setApellidos(aprendiz.getApellidos());
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
