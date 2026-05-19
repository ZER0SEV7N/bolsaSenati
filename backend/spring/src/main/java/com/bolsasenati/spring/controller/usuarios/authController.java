package com.bolsasenati.spring.controller.usuarios;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bolsasenati.spring.services.jwtServices;
import com.bolsasenati.spring.services.usuario.authServices;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bolsasenati.spring.models.Usuario;
import com.bolsasenati.spring.models.dtos.createAprendizDto;
import com.bolsasenati.spring.models.dtos.loginDto;
import com.bolsasenati.spring.models.dtos.responseAprendizDto;
import com.bolsasenati.spring.models.payload.response;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

// Controlador para manejar las rutas de autenticación y registro de usuarios
@RestController
@RequestMapping("/auth")

public class authController {

    @Autowired
    private authServices authServices;

    @Autowired
    private jwtServices jwtServices;

    // POST: /auth/login
    // Inicia sesión y devuelve el token JWT + perfil del usuario
    @PostMapping("/login")
    public ResponseEntity<response<Map<String, Object>>> login(@RequestBody loginDto dto) {
        Usuario usuario = authServices.login(dto.getCorreo(), dto.getPassword());

        if (usuario == null)
            return ResponseEntity.status(400).body(new response<>(false, "Credenciales inválidas", null));

        String token = jwtServices.generarToken(dto.getCorreo());

        // Intentar devolver el DTO completo del aprendiz; si no aplica (otro rol),
        // devolver usuario base
        Object perfilUsuario = authServices.mapearAprendizADto(usuario);
        if (perfilUsuario == null)
            perfilUsuario = usuario;

        Map<String, Object> data = new HashMap<>();
        data.put("token", token);
        data.put("usuario", perfilUsuario);

        return ResponseEntity.status(200).body(new response<>(true, "Login exitoso", data));
    }

    // POST: /auth/registrar-aprendiz
    // Registra un nuevo aprendiz (ruta de prueba)
    @PostMapping("/registrar-aprendiz")
    public ResponseEntity<response<responseAprendizDto>> registrarAprendiz(@RequestBody createAprendizDto dto) {
        responseAprendizDto usuario = authServices.registrarAprendiz(dto);

        if (usuario == null)
            return ResponseEntity.status(400).body(new response<>(false, "No se pudo registrar el aprendiz", null));

        return ResponseEntity.status(201).body(new response<>(true, "Aprendiz registrado exitosamente", usuario));
    }

    // GET: /auth/perfil
    // Devuelve el perfil del usuario autenticado (ruta de prueba)
    @GetMapping("/perfil")
    public ResponseEntity<response<Object>> obtenerPerfil() {
        String correoAutenticado = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        Usuario usuario = authServices.obtenerPerfil(correoAutenticado);

        if (usuario == null)
            return ResponseEntity.status(404).body(new response<>(false, "Usuario no encontrado", null));

        Object perfilUsuario = authServices.mapearAprendizADto(usuario);
        if (perfilUsuario == null)
            perfilUsuario = usuario;

        return ResponseEntity.status(200).body(new response<>(true, "Perfil obtenido exitosamente", perfilUsuario));
    }

   

}
