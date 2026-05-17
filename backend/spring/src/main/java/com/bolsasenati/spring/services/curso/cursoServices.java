package com.bolsasenati.spring.services.curso;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolsasenati.spring.models.Curso;
import com.bolsasenati.spring.models.Operacion;
import com.bolsasenati.spring.models.Tarea;
import com.bolsasenati.spring.models.dtos.cursoDTO;
import com.bolsasenati.spring.models.dtos.operacionDTO;
import com.bolsasenati.spring.models.dtos.tareaDTO;
import com.bolsasenati.spring.repository.curso.cursoRepository;
import com.bolsasenati.spring.repository.tarea.tareaRepository;
import com.bolsasenati.spring.repository.operacion.operacionRepository;

@Service
public class cursoServices {
    @Autowired private cursoRepository cursoRepository;
    @Autowired private tareaRepository tareaRepository;
    @Autowired private operacionRepository operacionRepository;

    public List<cursoDTO> allCursos() {
    List<Curso> cursos = cursoRepository.findAll();

    return cursos.stream().map(curso -> {
        cursoDTO cDto = new cursoDTO();
        cDto.setId(curso.getId());
        cDto.setNombre(curso.getNombre());
        cDto.setCredito(curso.getCredito());
        cDto.setCreateAt(curso.getCreateAt() != null ? curso.getCreateAt().toString() : null);
        cDto.setUpdateAt(curso.getUpdateAt() != null ? curso.getUpdateAt().toString() : null);

        List<Tarea> tareas = tareaRepository.findByCursoId(curso.getId());
        
        List<tareaDTO> tareasDTO = tareas.stream().map(tarea -> {
            tareaDTO tDto = new tareaDTO();
            tDto.setId(tarea.getId());
            tDto.setTarea(tarea.getNombre());
            tDto.setDescripcion(tarea.getDescripcion());
            tDto.setCreateAt(tarea.getCreateAt() != null ? tarea.getCreateAt().toString() : null);
            tDto.setUpdateAt(tarea.getUpdateAt() != null ? tarea.getUpdateAt().toString() : null);

            List<Operacion> operaciones = operacionRepository.findByTareaId(tarea.getId());
            
            List<operacionDTO> operacionesDTO = operaciones.stream().map(operacion -> {
                operacionDTO oDto = new operacionDTO();
                oDto.setId(operacion.getId());
                oDto.setOperacion(operacion.getOperacion());
                oDto.setDescripcion(operacion.getDescripcion());
                oDto.setCreateAt(operacion.getCreateAt() != null ? operacion.getCreateAt().toString() : null);
                oDto.setUpdateAt(operacion.getUpdateAt() != null ? operacion.getUpdateAt().toString() : null);
                return oDto;
            }).toList();

            tDto.setOperaciones(operacionesDTO);
            return tDto;
        }).toList();

        cDto.setTareas(tareasDTO);
        return cDto;
    }).toList();
}
}
