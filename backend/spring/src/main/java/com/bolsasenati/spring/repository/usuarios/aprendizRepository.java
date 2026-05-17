package com.bolsasenati.spring.repository.usuarios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bolsasenati.spring.models.Aprendiz;

@Repository
public interface aprendizRepository extends JpaRepository<Aprendiz, Integer> {

    //Obtener el aprendiz por su correo institucional
    Aprendiz findByCorreoInstitucional(String correoInstitucional);

    //Obtener el aprendiz por su código de aprendiz
    Aprendiz findByCodigoAprendiz(String codigoAprendiz);

    
}
