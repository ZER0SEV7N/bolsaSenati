package com.bolsasenati.spring.services.dashboard;

import com.bolsasenati.spring.models.Aprendiz;
import com.bolsasenati.spring.models.ProgresoOperacion;
import com.bolsasenati.spring.models.Tarea;
import com.bolsasenati.spring.models.payload.DashboardCalificacionDTO;
import com.bolsasenati.spring.models.payload.DashboardCalificacionDTO.VisitaDTO;
import com.bolsasenati.spring.models.payload.DashboardComentariosDTO;
import com.bolsasenati.spring.models.payload.DashboardComentariosDTO.ComentarioDTO;
import com.bolsasenati.spring.models.payload.DashboardResumenDTO;
import com.bolsasenati.spring.models.payload.DashboardResumenDTO.TareaDetalleDTO;
import com.bolsasenati.spring.repository.dashboard.progresoOperacionRepository;
import com.bolsasenati.spring.repository.dashboard.visitaSeguimientoRepository;
import com.bolsasenati.spring.repository.dashboard.comentarioAvanceRepository;
import com.bolsasenati.spring.repository.usuarios.aprendizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

// Calcula el resumen de progreso del aprendiz autenticado
@Service
public class dashboardService {

        @Autowired
        private progresoOperacionRepository progresoRepo;

        @Autowired
        private aprendizRepository aprendizRepo;

        @Autowired
        private visitaSeguimientoRepository visitaRepo;

        @Autowired
        private comentarioAvanceRepository comentarioRepo;

        // Helper: busca el aprendiz por su correo institucional
        private Aprendiz buscarAprendiz(String correo) {
                Aprendiz aprendiz = aprendizRepo.findByCorreoInstitucional(correo);
                if (aprendiz == null)
                        throw new RuntimeException("Aprendiz no encontrado");
                return aprendiz;
        }

        // GET /dashboard/resumen
        public DashboardResumenDTO getResumen(String correo) {

                Aprendiz aprendiz = buscarAprendiz(correo);
                Integer idAprendiz = aprendiz.getIdaprendiz();

                List<ProgresoOperacion> progresos = progresoRepo.findByAprendizIdWithDetails(idAprendiz);

                long totalOperaciones = progresos.size();
                long operacionesRealizadas = progresos.stream()
                                .filter(p -> p.getEstado() == ProgresoOperacion.EstadoOperacion.realizado)
                                .count();
                long operacionesPendientes = totalOperaciones - operacionesRealizadas;

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

                double porcentaje = totalOperaciones > 0
                                ? Math.round((operacionesRealizadas * 100.0 / totalOperaciones) * 10.0) / 10.0
                                : 0.0;

                double promedio = porcentaje >= 90 ? 19.0
                                : porcentaje >= 70 ? 17.0
                                                : porcentaje >= 50 ? 14.0
                                                                : 11.0;

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

        // GET /dashboard/calificacion
        public DashboardCalificacionDTO getCalificacion(String correo) {

                Aprendiz aprendiz = buscarAprendiz(correo);
                Integer idAprendiz = aprendiz.getIdaprendiz();

                List<Object[]> visitas = visitaRepo.findVisitasByAprendiz(idAprendiz);

                // Mapear cada fila a VisitaDTO
                List<VisitaDTO> historial = visitas.stream().map(row -> {
                        VisitaDTO v = new VisitaDTO();
                        v.setFecha(row[0] != null ? row[0].toString() : null);
                        v.setNota(row[1] != null ? ((Number) row[1]).intValue() : null);
                        v.setEstado(row[2] != null ? row[2].toString() : null);
                        v.setInstructor(row[3] != null ? row[3].toString() : null);
                        return v;
                }).collect(Collectors.toList());

                // La primera de la lista es la más reciente (última visita)
                VisitaDTO ultimaVisita = historial.isEmpty() ? null : historial.get(0);

                // Calcular promedio de notas
                double promedio = historial.stream()
                                .filter(v -> v.getNota() != null)
                                .mapToInt(VisitaDTO::getNota)
                                .average()
                                .orElse(0.0);

                // Redondear a 2 decimales
                promedio = Math.round(promedio * 100.0) / 100.0;

                DashboardCalificacionDTO dto = new DashboardCalificacionDTO();
                dto.setPromedio(promedio);
                dto.setUltimaVisita(ultimaVisita);
                dto.setHistorialVisitas(historial);

                return dto;
        }

        // GET /dashboard/comentarios
        public DashboardComentariosDTO getComentarios(String correo) {

                Aprendiz aprendiz = buscarAprendiz(correo);
                Integer idAprendiz = aprendiz.getIdaprendiz();

                List<Object[]> rows = comentarioRepo.findComentariosByAprendiz(idAprendiz);

                List<ComentarioDTO> comentarios = rows.stream().map(row -> {
                        ComentarioDTO c = new ComentarioDTO();
                        c.setFecha(row[0] != null ? row[0].toString() : null);
                        c.setCalificacion(row[1] != null ? ((Number) row[1]).doubleValue() : null);
                        c.setInstructor(row[2] != null ? row[2].toString() : null);
                        c.setMensaje(row[3] != null ? row[3].toString() : null);
                        return c;
                }).collect(Collectors.toList());

                DashboardComentariosDTO dto = new DashboardComentariosDTO();
                dto.setComentarios(comentarios);

                return dto;
        }
}
