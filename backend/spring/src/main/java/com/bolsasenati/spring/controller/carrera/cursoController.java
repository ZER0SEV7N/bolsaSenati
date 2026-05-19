package com.bolsasenati.spring.controller.carrera;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bolsasenati.spring.models.payload.response;
import com.bolsasenati.spring.services.curso.cursoServices;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import com.bolsasenati.spring.models.dtos.cursoDTO;


@RestController
@RequestMapping("/curso")
public class cursoController {
    @Autowired cursoServices cursoServices;

    @GetMapping("/filtrar")
    public ResponseEntity<response<List<cursoDTO>>> allCursos(@RequestParam Integer idAprendiz,@RequestParam Integer idCarrera, @RequestParam String ciclo) {
        try {
            List<cursoDTO> cursos = cursoServices.obtenerCursosPorCarreraYCiclo(idAprendiz, idCarrera, ciclo);
            return ResponseEntity.ok(new response<>(true, "Cursos obtenidos exitosamente", cursos));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new response<>(false, "Error al obtener los cursos: " + e.getMessage(), null));
        }
    }
    
}
