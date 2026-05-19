package com.bolsasenati.spring.controller.usuarios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bolsasenati.spring.models.Distrito;
import com.bolsasenati.spring.models.payload.response;
import com.bolsasenati.spring.repository.usuarios.distritoRepository;

@RestController
@RequestMapping("/distritos")
public class distritoController {

    @Autowired
    private distritoRepository distritoRepository;

    //GET: /distritos
    //Devuelve la lista completa de distritos (ID y Nombre) para llenar los Select del Frontend
    @GetMapping
    public ResponseEntity<response<List<Distrito>>> obtenerTodosDistritos() {
        List<Distrito> catalog = distritoRepository.findAll();
        
        return ResponseEntity.ok(new response<>(true, "Catálogo de distritos", catalog));
    }
}