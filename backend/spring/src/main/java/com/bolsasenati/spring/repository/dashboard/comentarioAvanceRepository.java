package com.bolsasenati.spring.repository.dashboard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bolsasenati.spring.models.empresa.ComentarioAvance;

import java.util.List;

@Repository
public interface comentarioAvanceRepository extends JpaRepository<ComentarioAvance, Integer> {

    // Devuelve todos los comentarios del aprendiz con el nombre del instructor
    // Ordenados de mas reciente a mas antiguo
    @Query("""
            SELECT ca.fecha,
                   ca.nota,
                   CONCAT(u.nombres, ' ', u.apellidos),
                   ca.contenido
            FROM ComentarioAvance ca
            JOIN ca.instructor u
            WHERE ca.aprendiz.id = :idAprendiz
            ORDER BY ca.fecha DESC
            """)
    List<Object[]> findComentariosByAprendiz(@Param("idAprendiz") Integer idAprendiz);
}
