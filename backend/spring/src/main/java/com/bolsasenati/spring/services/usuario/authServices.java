package com.bolsasenati.spring.services.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bolsasenati.spring.config.jwtFilter;
import com.bolsasenati.spring.models.Aprendiz;
import com.bolsasenati.spring.models.Usuario;
import com.bolsasenati.spring.repository.usuarios.aprendizRepository;
import com.bolsasenati.spring.repository.usuarios.usuarioRepository;
import com.bolsasenati.spring.models.dtos.createAprendizDto;

@Service
public class authServices {

    @Autowired
    private usuarioRepository usuarioRepository;

    @Autowired
    private aprendizRepository aprendizRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    //Metodo para loguearse
    public Usuario login(String correoPersonal, String password){
        Usuario usuario = usuarioRepository.findByCorreoPersonal(correoPersonal);

        if(usuario == null || !passwordEncoder.matches(password, usuario.getPassword()))
            return null; 

        return usuario; 
    }

    //Metodo de prueba para registrar un nuevo aprendiz
    @Transactional
    public Usuario registrarAprendiz(CreateAprendizDto dto){
        if(usuarioRepository.findByCorreoPersonal(dto.getCorreoPersonal()) != null) 
            return null;

        if(usuarioRepository.findByDocumentoIdentidad(dto.getDocumento_identidad()) != null)
            return null;

        //Primero se crea el usuario
        Usuario usuario = new Usuario();
        usuario.setNombres(dto.getNombres());
        usuario.setApellidos(dto.getApellidos());
        usuario.setCorreoPersonal(dto.getCorreoPersonal());
        usuario.setDocumentoIdentidad(dto.getDocumento_identidad());
        usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
        usuario.setTelefono(dto.getTelefono());

        //Luego se guarda el usuario para obtener su id
        Usuario savedUsuario = usuarioRepository.save(usuario);

        //Ahora se crea el aprendiz con el id del usuario
        Aprendiz aprendiz = new Aprendiz();
        aprendiz.set(savedUsuario);
        aprendiz.setCodigoAprendiz(dto.getCodigoAprendiz());


        return usuarioRepository.save(usuario);
    }

}
