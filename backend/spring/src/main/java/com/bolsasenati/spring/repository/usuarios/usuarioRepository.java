package com.bolsasenati.spring.repository.usuarios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bolsasenati.spring.models.usuario.Usuario;

@Repository
public interface usuarioRepository extends JpaRepository<Usuario, Integer> {
    
    //Obtener el usuario por su correo personal
    Usuario findByCorreoPersonal(String correoPersonal);

    //Obtener el usuario por su documento de identidad
    Usuario findByDocumentoIdentidad(String documentoIdentidad);

    //Obtener todos los usuarios
    List<Usuario> findAll();


}
