package com.bolsasenati.spring.repository.usuarios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bolsasenati.spring.models.Distrito;

public interface distritoRepository extends JpaRepository<Distrito, Integer> {

    List<Distrito> findAll();

    @Query("SELECT d.distrito FROM Aprendiz a JOIN a.distritosInteres d WHERE a.idAprendiz = :idAprendiz")
    List<String> findNombresDistritosByAprendizId(@Param("idAprendiz") Integer idAprendiz);
}
