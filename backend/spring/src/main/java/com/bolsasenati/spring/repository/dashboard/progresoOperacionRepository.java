package com.bolsasenati.spring.repository.dashboard;

import com.bolsasenati.spring.models.ProgresoOperacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface progresoOperacionRepository extends JpaRepository<ProgresoOperacion, Integer> {

    // Todas las operaciones del aprendiz con sus relaciones (tarea → curso)
    @Query("""
            SELECT po FROM ProgresoOperacion po
            JOIN FETCH po.operacion o
            JOIN FETCH o.tarea t
            JOIN FETCH t.curso c
            WHERE po.aprendiz.id = :idAprendiz
            ORDER BY t.id
            """)
    List<ProgresoOperacion> findByAprendizIdWithDetails(@Param("idAprendiz") Integer idAprendiz);

    // Cuenta total de operaciones del aprendiz
    @Query("SELECT COUNT(po) FROM ProgresoOperacion po WHERE po.aprendiz.id = :idAprendiz")
    long countByAprendizId(@Param("idAprendiz") Integer idAprendiz);

    // Cuenta de operaciones por estado
    @Query("SELECT COUNT(po) FROM ProgresoOperacion po WHERE po.aprendiz.id = :idAprendiz AND po.estado = :estado")
    long countByAprendizIdAndEstado(
            @Param("idAprendiz") Integer idAprendiz,
            @Param("estado") ProgresoOperacion.EstadoOperacion estado);
}
