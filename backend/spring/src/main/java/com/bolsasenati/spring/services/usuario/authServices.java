package com.bolsasenati.spring.services.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bolsasenati.spring.models.Aprendiz;
import com.bolsasenati.spring.models.Carrera;
import com.bolsasenati.spring.models.Usuario;
import com.bolsasenati.spring.repository.usuarios.aprendizRepository;
import com.bolsasenati.spring.repository.usuarios.usuarioRepository;
import com.bolsasenati.spring.models.dtos.createAprendizDto;

//Servicio para manejar la autenticación y registro de usuarios
@Service
public class authServices {

    @Autowired
    private usuarioRepository usuarioRepository;

    @Autowired
    private aprendizRepository aprendizRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    //Metodo para loguearse
    public Usuario login(String correo, String password){
        Usuario usuario = usuarioRepository.findByCorreoPersonal(correo);

        //Si no se encuentra el usuario por correo institucional, se busca por correo personal en la tabla de usuarios
        if(correo != null && password != null){
            Aprendiz aprendiz = aprendizRepository.findByCorreoInstitucional(correo);
            if(aprendiz != null){
                usuario = aprendiz.getUsuario();
            } else {
                usuario = usuarioRepository.findByCorreoPersonal(correo);
            }
        }

        //
        if(usuario == null || !passwordEncoder.matches(password, usuario.getPassword())) {
            return null; 
        }

        return usuario; 
    }

    //Metodo de prueba para registrar un nuevo aprendiz
    @Transactional
    public Usuario registrarAprendiz(createAprendizDto dto){
        if(usuarioRepository.findByCorreoPersonal(dto.getCorreoPersonal()) != null) 
            return null;

        if(usuarioRepository.findByDocumentoIdentidad(dto.getDocumentoIdentidad()) != null)
            return null;

        //Primero se crea el usuario
        Usuario usuario = new Usuario();
        usuario.setNombres(dto.getNombres());
        usuario.setApellidos(dto.getApellidos());
        usuario.setCorreoPersonal(dto.getCorreoPersonal());
        usuario.setDocumentoIdentidad(dto.getDocumentoIdentidad());
        usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
        usuario.setTelefono(dto.getTelefono());

        //Luego se guarda el usuario para obtener su id
        Usuario savedUsuario = usuarioRepository.save(usuario);

        //Ahora se crea el aprendiz con el id del usuario
        Aprendiz aprendiz = new Aprendiz();
        aprendiz.setUsuario(savedUsuario);
        aprendiz.setCodigoAprendiz(dto.getCodigoAprendiz());
        aprendiz.setCorreoInstitucional(dto.getCodigoAprendiz().replace("@", ".") + "@senati.pe");

        //Se asigna el ciclo por defecto
        aprendiz.setCiclo(dto.getCiclo());

        //Se asigna la carrera al aprendiz
        Carrera carreraRef = new Carrera();
        carreraRef.setId(dto.getIdCarrera());
        aprendiz.setCarrera(carreraRef);
        
        aprendizRepository.save(aprendiz);

        return savedUsuario;
    }

}
