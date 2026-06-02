package com.bolsasenati.spring.services.dashboard;

import com.bolsasenati.spring.models.Dashboard.DashboardAvancePeaDTO;
import com.bolsasenati.spring.models.Dashboard.DashboardCalificacionDTO;
import com.bolsasenati.spring.models.Dashboard.DashboardComentariosDTO;
import com.bolsasenati.spring.models.Dashboard.DashboardResumenDTO;
import com.bolsasenati.spring.models.Dashboard.DashboardTareasDTO;
import com.bolsasenati.spring.models.Dashboard.DashboardCalificacionDTO.VisitaDTO;
import com.bolsasenati.spring.models.Dashboard.DashboardComentariosDTO.ComentarioDTO;
import com.bolsasenati.spring.models.Dashboard.DashboardResumenDTO.TareaDetalleDTO;
import com.bolsasenati.spring.models.senati.ProgresoOperacion;
import com.bolsasenati.spring.models.senati.Tarea;
import com.bolsasenati.spring.models.usuario.aprendiz.Aprendiz;
import com.bolsasenati.spring.repository.dashboard.comentarioAvanceRepository;
import com.bolsasenati.spring.repository.dashboard.progresoOperacionRepository;
import com.bolsasenati.spring.repository.dashboard.visitaSeguimientoRepository;
import com.bolsasenati.spring.repository.usuarios.aprendiz.aprendizRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

// Se calcula el resumen de progreso del aprendiz autenticado
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

        // Helper interno: calcula el progreso a partir de los registros
        // Reutilizado por getResumen, getAvancePea y getTareas
        private record ProgresoCalculado(
                        int totalOperaciones,
                        int operacionesRealizadas,
                        int operacionesPendientes,
                        int totalTareas,
                        int tareasCompletadas,
                        int tareasPendientes,
                        double porcentajeCumplimiento,
                        List<DashboardTareasDTO.TareaDetalleDTO> tareas) {
        }

        private ProgresoCalculado calcularProgreso(Integer idAprendiz) {
                List<ProgresoOperacion> progresos = progresoRepo.findByAprendizIdWithDetails(idAprendiz);

                int totalOperaciones = progresos.size();
                int operacionesRealizadas = (int) progresos.stream()
                                .filter(p -> p.getEstado() == ProgresoOperacion.EstadoOperacion.realizado)
                                .count();
                int operacionesPendientes = totalOperaciones - operacionesRealizadas;

                // Agrupar por tarea
                Map<Tarea, List<ProgresoOperacion>> porTarea = progresos.stream()
                                .collect(Collectors.groupingBy(p -> p.getOperacion().getTarea()));

                List<DashboardTareasDTO.TareaDetalleDTO> tareas = new ArrayList<>();
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

                        DashboardTareasDTO.TareaDetalleDTO dto = new DashboardTareasDTO.TareaDetalleDTO();
                        dto.setId(tarea.getId());
                        dto.setNombre(tarea.getNombre());
                        dto.setCurso(tarea.getCurso().getNombre());
                        dto.setTotalOperaciones(totalOps);
                        dto.setOperacionesRealizadas(realizadas);
                        dto.setEstado(completada ? "completada" : "en progreso");
                        tareas.add(dto);
                }

                int totalTareas = tareas.size();
                int tareasPendientes = totalTareas - tareasCompletadas;

                double porcentaje = totalOperaciones > 0
                                ? Math.round((operacionesRealizadas * 100.0 / totalOperaciones) * 10.0) / 10.0
                                : 0.0;

                return new ProgresoCalculado(
                                totalOperaciones, operacionesRealizadas, operacionesPendientes,
                                totalTareas, tareasCompletadas, tareasPendientes,
                                porcentaje, tareas);
        }

        // GET /dashboard/resumen
        public DashboardResumenDTO getResumen(String correo) {
                Aprendiz aprendiz = buscarAprendiz(correo);
                ProgresoCalculado p = calcularProgreso(aprendiz.getIdAprendiz());

                double promedio = p.porcentajeCumplimiento() >= 90 ? 19.0
                                : p.porcentajeCumplimiento() >= 70 ? 17.0
                                                : p.porcentajeCumplimiento() >= 50 ? 14.0
                                                                : 11.0;

                // Convertir TareaDetalleDTO de DashboardTareasDTO a DashboardResumenDTO
                List<TareaDetalleDTO> tareasResumen = p.tareas().stream().map(t -> {
                        TareaDetalleDTO dto = new TareaDetalleDTO();
                        dto.setId(t.getId());
                        dto.setNombre(t.getNombre());
                        dto.setCurso(t.getCurso());
                        dto.setTotalOperaciones(t.getTotalOperaciones());
                        dto.setOperacionesRealizadas(t.getOperacionesRealizadas());
                        dto.setEstado(t.getEstado());
                        return dto;
                }).collect(Collectors.toList());

                DashboardResumenDTO resumen = new DashboardResumenDTO();
                resumen.setNombres(aprendiz.getUsuario().getNombres());
                resumen.setApellidos(aprendiz.getUsuario().getApellidos());
                resumen.setPromedio(promedio);
                resumen.setTotalTareas(p.totalTareas());
                resumen.setTareasCompletadas(p.tareasCompletadas());
                resumen.setTareasPendientes(p.tareasPendientes());
                resumen.setTotalOperaciones(p.totalOperaciones());
                resumen.setOperacionesRealizadas(p.operacionesRealizadas());
                resumen.setOperacionesPendientes(p.operacionesPendientes());
                resumen.setPorcentajeCumplimiento(p.porcentajeCumplimiento());
                resumen.setTareas(tareasResumen);
                return resumen;
        }

        // GET /dashboard/avance-pea
        // Solo devuelve los numeros: % cumplimiento, tareas y operaciones
        public DashboardAvancePeaDTO getAvancePea(String correo) {
                Aprendiz aprendiz = buscarAprendiz(correo);
                ProgresoCalculado p = calcularProgreso(aprendiz.getIdAprendiz());

                DashboardAvancePeaDTO dto = new DashboardAvancePeaDTO();
                dto.setPorcentajeCumplimiento(p.porcentajeCumplimiento());
                dto.setTotalTareas(p.totalTareas());
                dto.setTareasCompletadas(p.tareasCompletadas());
                dto.setTareasPendientes(p.tareasPendientes());
                dto.setTotalOperaciones(p.totalOperaciones());
                dto.setOperacionesRealizadas(p.operacionesRealizadas());
                dto.setOperacionesPendientes(p.operacionesPendientes());
                return dto;
        }

        // GET /dashboard/tareas
        public DashboardTareasDTO getTareas(String correo) {
                Aprendiz aprendiz = buscarAprendiz(correo);
                ProgresoCalculado p = calcularProgreso(aprendiz.getIdAprendiz());

                DashboardTareasDTO dto = new DashboardTareasDTO();
                dto.setTotalTareas(p.totalTareas());
                dto.setTareasCompletadas(p.tareasCompletadas());
                dto.setTareasPendientes(p.tareasPendientes());
                dto.setTareas(p.tareas());
                return dto;
        }

        // GET /dashboard/calificacion
        public DashboardCalificacionDTO getCalificacion(String correo) {
                Aprendiz aprendiz = buscarAprendiz(correo);
                Integer idAprendiz = aprendiz.getIdAprendiz();

                List<Object[]> visitas = visitaRepo.findVisitasByAprendiz(idAprendiz);

                List<VisitaDTO> historial = visitas.stream().map(row -> {
                        VisitaDTO v = new VisitaDTO();
                        v.setFecha(row[0] != null ? row[0].toString() : null);
                        v.setNota(row[1] != null ? ((Number) row[1]).intValue() : null);
                        v.setEstado(row[2] != null ? row[2].toString() : null);
                        v.setInstructor(row[3] != null ? row[3].toString() : null);
                        return v;
                }).collect(Collectors.toList());

                VisitaDTO ultimaVisita = historial.isEmpty() ? null : historial.get(0);

                double promedio = historial.stream()
                                .filter(v -> v.getNota() != null)
                                .mapToInt(VisitaDTO::getNota)
                                .average()
                                .orElse(0.0);
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
                Integer idAprendiz = aprendiz.getIdAprendiz();

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
