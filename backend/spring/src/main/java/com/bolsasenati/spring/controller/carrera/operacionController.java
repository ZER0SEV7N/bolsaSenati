package com.bolsasenati.spring.controller.carrera;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bolsasenati.spring.models.dtos.operacionRequest;
import com.bolsasenati.spring.models.payload.response;
import com.bolsasenati.spring.services.operacion.operacionServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/operacion")
public class operacionController {
    @Autowired private operacionServices operacionServices;

    @PostMapping("/guardar-progreso-operacion")
    public ResponseEntity<response<String>> guardarProgresoOperacion(@RequestBody operacionRequest request) {        
        try{
            String resultado = operacionServices.guardarProgresoOperacion(request.getIdAprendiz(), request.getIdOperacion(), request.getEstado());
            return ResponseEntity.status(200).body(new response<>(true, resultado, null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new response<>(false, "Error: " + e.getMessage(), null));
        }
    }
    
}
