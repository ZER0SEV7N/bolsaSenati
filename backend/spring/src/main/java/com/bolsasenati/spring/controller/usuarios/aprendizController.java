package com.bolsasenati.spring.controller.usuarios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bolsasenati.spring.models.Usuario;
import com.bolsasenati.spring.models.dtos.responseAprendizDto;
import com.bolsasenati.spring.models.dtos.updateAprendizDto;
import com.bolsasenati.spring.models.dtos.updateContactoDto;
import com.bolsasenati.spring.models.dtos.cambiarPasswordDto;
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

    @PatchMapping("/contacto")
    public ResponseEntity<response<responseAprendizDto>> actualizarContacto(@RequestBody updateContactoDto dto) {
        String correoAutenticado = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = authServices.obtenerPerfil(correoAutenticado);

        if (usuario == null) {
            return ResponseEntity.status(404).body(new response<>(false, "Usuario no encontrado", null));
        }

        responseAprendizDto perfilActualizado = authServices.actualizarContacto(usuario.getId(), dto);
        return ResponseEntity.ok(new response<>(true, "Contacto actualizado con éxito", perfilActualizado));
    }

    @PatchMapping("/cambiar-password")
    public ResponseEntity<response<String>> cambiarPassword(@RequestBody cambiarPasswordDto dto) {
        String correoAutenticado = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = authServices.obtenerPerfil(correoAutenticado);

        if (usuario == null) {
            return ResponseEntity.status(404).body(new response<>(false, "Usuario no encontrado", null));
        }

        boolean actualizado = authServices.cambiarPassword(usuario.getId(), dto);
        if (!actualizado) {
            return ResponseEntity.status(400).body(new response<>(false, "La contraseña actual es incorrecta", null));
        }

        return ResponseEntity.ok(new response<>(true, "Contraseña actualizada con éxito", null));
    }
}
