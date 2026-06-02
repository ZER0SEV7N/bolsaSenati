package com.bolsasenati.spring.controller.ubicacion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bolsasenati.spring.util.Response;
import com.bolsasenati.spring.models.ubicacion.Distrito;
import com.bolsasenati.spring.repository.ubicacion.distritoRepository;

//Controlador para manejar las rutas relacionadas a los distritos
@RestController
@RequestMapping("/distritos")
public class distritoController {

    @Autowired private distritoRepository distritoRepository;

    //GET: /distritos
    //Devuelve la lista completa de distritos (ID y Nombre) para llenar los Select del Frontend
    @GetMapping
    public ResponseEntity<Response<List<Distrito>>> obtenerTodosDistritos() {
        List<Distrito> catalog = distritoRepository.findAll();
        return ResponseEntity.ok(new Response<>(true, "Catálogo de distritos", catalog));
    }
}