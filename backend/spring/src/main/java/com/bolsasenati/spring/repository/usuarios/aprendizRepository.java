package com.bolsasenati.spring.repository.usuarios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bolsasenati.spring.models.Aprendiz;

@Repository
public interface aprendizRepository extends JpaRepository<Aprendiz, Integer> {

    //Obtener el aprendiz por su correo institucional
    Aprendiz findByCorreoInstitucional(String correoInstitucional);

    //Obtener el aprendiz por su código de aprendiz
    Aprendiz findByCodigoAprendiz(String codigoAprendiz);

    @Query("SELECT a FROM Aprendiz a LEFT JOIN FETCH a.distritosInteres WHERE a.id = :id")
    Aprendiz findByIdWithDistritos(@Param("id") Integer id);
}
