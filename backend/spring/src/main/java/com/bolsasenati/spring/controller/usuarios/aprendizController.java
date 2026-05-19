package com.bolsasenati.spring.controller.usuarios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bolsasenati.spring.models.Usuario;
import com.bolsasenati.spring.models.dtos.responseAprendizDto;
import com.bolsasenati.spring.models.dtos.updateAprendizDto;
import com.bolsasenati.spring.models.payload.response;
import com.bolsasenati.spring.services.usuario.aprendizService;
import com.bolsasenati.spring.services.usuario.authServices;

@RestController
@RequestMapping("/aprendiz")
public class aprendizController {

    @Autowired
    private aprendizService aprendizService;

    @Autowired
    private authServices authServices;

    @PatchMapping("/intereses")
    public ResponseEntity<response<responseAprendizDto>> actualizarIntereses(@RequestBody updateAprendizDto dto) {
        //Extraemos el correo del usuario autenticado por JWT
        String correoAutenticado = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = authServices.obtenerPerfil(correoAutenticado);

        if (usuario == null) {
            return ResponseEntity.status(404).body(new response<>(false, "Usuario no encontrado", null));
        }

        //Ejecutamos la actualización usando el ID del usuario logueado
        responseAprendizDto perfilActualizado = aprendizService.actualizarIntereses(usuario.getId(), dto);

        return ResponseEntity.ok(new response<>(true, "Intereses y palabras clave actualizados con éxito", perfilActualizado));
    
    }
}
