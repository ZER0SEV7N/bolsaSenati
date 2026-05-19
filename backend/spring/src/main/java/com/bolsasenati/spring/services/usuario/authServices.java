package com.bolsasenati.spring.services.usuario;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bolsasenati.spring.models.Aprendiz;
import com.bolsasenati.spring.models.Carrera;
import com.bolsasenati.spring.models.Distrito;
import com.bolsasenati.spring.models.Rol;
import com.bolsasenati.spring.models.Usuario;
import com.bolsasenati.spring.repository.usuarios.aprendizRepository;
import com.bolsasenati.spring.repository.usuarios.usuarioRepository;
import com.bolsasenati.spring.repository.carrera.carreraRepository;
import com.bolsasenati.spring.repository.usuarios.rolRepository;
import com.bolsasenati.spring.models.dtos.createAprendizDto;
import com.bolsasenati.spring.models.dtos.responseAprendizDto;
import com.bolsasenati.spring.models.dtos.updateContactoDto;
import com.bolsasenati.spring.models.dtos.cambiarPasswordDto;

//Servicio para manejar la autenticación y registro de usuarios
@Service
public class authServices {

    @Autowired
    private usuarioRepository usuarioRepository;

    @Autowired
    private aprendizRepository aprendizRepository;

    @Autowired
    private carreraRepository carreraRepository;

    @Autowired
    private rolRepository rolRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    //Metodo para loguearse
    public Usuario login(String correo, String password) {
        Usuario usuario = usuarioRepository.findByCorreoPersonal(correo);

        //Si no se encuentra el usuario por correo institucional, se busca por correo
        //personal en la tabla de usuarios
        if (correo != null && password != null) {
            Aprendiz aprendiz = aprendizRepository.findByCorreoInstitucional(correo);
            if (aprendiz != null) {
                usuario = aprendiz.getUsuario();
            } else {
                usuario = usuarioRepository.findByCorreoPersonal(correo);
            }
        }

        if (usuario == null || !passwordEncoder.matches(password, usuario.getPassword())) {
            return null;
        }

        return usuario;
    }

    //Metodo de prueba para registrar un nuevo aprendiz
    @Transactional
    public responseAprendizDto registrarAprendiz(createAprendizDto dto) {
        if (usuarioRepository.findByCorreoPersonal(dto.getCorreoPersonal()) != null)
            return null;

        if (usuarioRepository.findByDocumentoIdentidad(dto.getDocumentoIdentidad()) != null)
            return null;

        Usuario usuario = new Usuario();
        usuario.setNombres(dto.getNombres());
        usuario.setApellidos(dto.getApellidos());
        usuario.setCorreoPersonal(dto.getCorreoPersonal());
        usuario.setDocumentoIdentidad(dto.getDocumentoIdentidad());
        usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
        usuario.setTelefono(dto.getTelefono());

        Rol rolAprendiz = rolRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("Error: El rol no existe en la BD"));
        usuario.setRol(rolAprendiz);

        Usuario savedUsuario = usuarioRepository.save(usuario);

        Aprendiz aprendiz = new Aprendiz();
        aprendiz.setUsuario(savedUsuario);
        aprendiz.setCodigoAprendiz(dto.getCodigoAprendiz());
        aprendiz.setCorreoInstitucional(dto.getCodigoAprendiz().replace("@", ".") + "@senati.pe");

        aprendiz.setCiclo(dto.getCiclo());

        Carrera carreraRef = carreraRepository.findById(dto.getIdCarrera())
                .orElseThrow(() -> new RuntimeException("Carrera no encontrada"));

        aprendiz.setCarrera(carreraRef);

        aprendizRepository.save(aprendiz);

        return mapearAprendizADto(savedUsuario);
    }

    // Metodo para obtener el perfil del usuario
    public Usuario obtenerPerfil(String correo) {
        if (correo != null && correo.toLowerCase().endsWith("@senati.pe")) {
            Aprendiz aprendiz = aprendizRepository.findByCorreoInstitucional(correo);
            return aprendiz != null ? aprendiz.getUsuario() : null;
        }
        return usuarioRepository.findByCorreoPersonal(correo);
    }

    // Metodo para estructurar la respuesta como DTO
    public responseAprendizDto mapearAprendizADto(Usuario usuario) {
        Aprendiz aprendiz = aprendizRepository.findById(usuario.getId()).orElse(null);

        if (aprendiz == null)
            return null;

        responseAprendizDto response = new responseAprendizDto();
        response.setId(usuario.getId());
        response.setNombres(usuario.getNombres());
        response.setApellidos(usuario.getApellidos());
        response.setDocumentoIdentidad(usuario.getDocumentoIdentidad());
        response.setCorreoPersonal(usuario.getCorreoPersonal());
        response.setTelefono(usuario.getTelefono());

        response.setCodigoAprendiz(aprendiz.getCodigoAprendiz());
        response.setCorreoInstitucional(aprendiz.getCorreoInstitucional());
        response.setCiclo(aprendiz.getCiclo());
        response.setPalabrasClave(aprendiz.getPalabrasClave());

        if (aprendiz.getCarrera() != null) {
            responseAprendizDto.CarreraDto cDto = new responseAprendizDto.CarreraDto();
            cDto.setId(aprendiz.getCarrera().getId());
            cDto.setCarrera(aprendiz.getCarrera().getCarrera());
            response.setCarreraDto(cDto);
        }

        if (aprendiz.getDistritosInteres() != null && !aprendiz.getDistritosInteres().isEmpty()) {
            Set<String> nombresDistritos = aprendiz.getDistritosInteres().stream()
                    .map(Distrito::getDistrito) 
                    .collect(Collectors.toSet());
            
            response.setDistritosInteres(nombresDistritos);
        } else {
            response.setDistritosInteres(new HashSet<>()); 
        }

        if (usuario.getRol() != null)
            response.setRol(usuario.getRol().getRol());

        return response;
    }

    @Transactional
    public responseAprendizDto actualizarContacto(Integer idUsuario, updateContactoDto dto) {
        Usuario usuario = usuarioRepository.findById(idUsuario).orElse(null);
        if (usuario == null) return null;
        
        if (dto.getTelefono() != null) usuario.setTelefono(dto.getTelefono());
        if (dto.getCorreoPersonal() != null) usuario.setCorreoPersonal(dto.getCorreoPersonal());
        
        usuarioRepository.save(usuario);
        return mapearAprendizADto(usuario);
    }

    @Transactional
    public boolean cambiarPassword(Integer idUsuario, cambiarPasswordDto dto) {
        Usuario usuario = usuarioRepository.findById(idUsuario).orElse(null);
        if (usuario == null) return false;
        
        if (!passwordEncoder.matches(dto.getActualPassword(), usuario.getPassword())) {
            return false; 
        }
        
        usuario.setPassword(passwordEncoder.encode(dto.getNuevaPassword()));
        usuarioRepository.save(usuario);
        return true;
    }
}
