package com.bolsasenati.spring.repository.dashboard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bolsasenati.spring.models.empresa.VisitaSeguimiento;

import java.util.List;

@Repository
public interface visitaSeguimientoRepository extends JpaRepository<VisitaSeguimiento, Integer> {

    // Devuelve todas las visitas del aprendiz con el nombre del instructor
    // Ordenadas de mas reciente a mas antigua (la primera es igual a la última
    // visita)
    @Query("""
            SELECT vs.fechaVisita,
                   vs.nota,
                   vs.estado,
                   CONCAT(u.nombres, ' ', u.apellidos)
            FROM VisitaSeguimiento vs
            JOIN vs.instructorSeguimiento ist
            JOIN ist.usuario u
            WHERE vs.aprendiz.id = :idAprendiz
            ORDER BY vs.fechaVisita DESC
            """)
    List<Object[]> findVisitasByAprendiz(@Param("idAprendiz") Integer idAprendiz);
}
