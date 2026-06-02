package com.bolsasenati.spring.controller.carrera;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bolsasenati.spring.util.Response;
import com.bolsasenati.spring.models.dtos.operacionRequest;
import com.bolsasenati.spring.services.operacion.operacionServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

//Controlador para manejar las rutas relacionadas a las operaciones de carrera 
//(guardar progreso, completar operación, etc.)
@RestController
@RequestMapping("/operacion")
public class operacionController {
    @Autowired private operacionServices operacionServices;

    //Endpoint POST: /operacion/guardar-progreso-operacion
    //Recibe el ID del aprendiz, ID de la operación y el estado actual (en progreso, completada, etc.)
    //Guarda o actualiza el progreso de la operación en la base de datos, permit
    @PostMapping("/guardar-progreso-operacion")
    public ResponseEntity<Response<String>> guardarProgresoOperacion(@RequestBody operacionRequest request) {        
        String resultado = operacionServices.guardarProgresoOperacion(request.getIdAprendiz(), request.getIdOperacion(), request.getEstado());
        return ResponseEntity.status(200).body(new Response<>(true, resultado, null));
        
    }
    
}
