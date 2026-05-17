package com.bolsasenati.spring.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bolsasenati.spring.services.jwtServices;
import com.bolsasenati.spring.services.usuario.authServices;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bolsasenati.spring.models.Usuario;
import com.bolsasenati.spring.models.dtos.createAprendizDto;
import com.bolsasenati.spring.models.dtos.loginDto;
import com.bolsasenati.spring.models.payload.response;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

//Controlador para manejar las rutas de autenticación y registro de usuarios
@RestController
@RequestMapping("/auth")
public class authController {

    @Autowired
    private authServices authServices;

    @Autowired
    private jwtServices jwtServices;

    //ruta para loguearse
    //POST: /auth/login
    @PostMapping("/login")
    public ResponseEntity<response<Map<String, Object>>> login(@RequestBody loginDto dto ){
        Usuario usuario = authServices.login(dto.getCorreo(), dto.getPassword());

        if(usuario == null)
            return ResponseEntity.status(400).body(new response<>(false,"Credenciales inválidas", null));

        String token = jwtServices.generarToken(dto.getCorreo());

        Map<String, Object> data =  new HashMap<>();
        data.put("token", token);
        data.put("usuario", usuario);

        return ResponseEntity.status(200).body(new response<>(true,"Login exitoso", data    ));
    }

    //ruta para registrar un nuevo aprendiz (esto es solo de prueba, no se recomienda exponer esta ruta en producción)
    //POST: /auth/registrar-aprendiz
    @PostMapping("/registrar-aprendiz")
    public ResponseEntity<response<Usuario>> registrarAprendiz(@RequestBody createAprendizDto dto){
        Usuario usuario = authServices.registrarAprendiz(dto);

        if(usuario == null)
            return ResponseEntity.status(400).body(new response<>(false,"No se pudo registrar el aprendiz", null));

        return ResponseEntity.status(201).body(new response<>(true,"Aprendiz registrado exitosamente", usuario));
    }

    //Ruta para obtener el perfil del usuario (esto es solo de prueba, no se recomienda exponer esta ruta en producción)
    //GET: /auth/perfil
    @GetMapping("/perfil")
    public ResponseEntity<response<Usuario>> obtenerPerfil(){
        String correoAutenticado = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();

        Usuario usuario = authServices.obtenerPerfil(correoAutenticado);

        if(usuario == null)
            return ResponseEntity.status(404).body(new response<>(false,"Usuario no encontrado", null));

        return ResponseEntity.status(200).body(new response<>(true,"Perfil obtenido exitosamente", usuario));
    }


}
