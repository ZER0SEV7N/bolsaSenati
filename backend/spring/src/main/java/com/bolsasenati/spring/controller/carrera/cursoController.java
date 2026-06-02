package com.bolsasenati.spring.controller.carrera;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bolsasenati.spring.services.curso.cursoServices;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

import com.bolsasenati.spring.util.Response;
import com.bolsasenati.spring.models.senati.dto.cursoDTO;

//Controlador para manejar las rutas relacionadas a los cursos de una carrera
//Todas las rutas requieren autenticación y devuelven información personalizada según el aprendiz autenticado
@RestController
@RequestMapping("/curso")
public class cursoController {
    
    @Autowired cursoServices cursoServices;

    //Endpoint GET: /curso/filtrar?idAprendiz=&idCarrera=&ciclo=
    @GetMapping("/filtrar")
    public ResponseEntity<Response<List<cursoDTO>>> allCursos(@RequestParam Integer idAprendiz,@RequestParam Integer idCarrera, @RequestParam String ciclo) {
        List<cursoDTO> cursos = cursoServices.obtenerCursosPorCarreraYCiclo(idAprendiz, idCarrera, ciclo);
        return ResponseEntity.ok(new Response<>(true, "Cursos obtenidos exitosamente", cursos));
        
    }
    
}
