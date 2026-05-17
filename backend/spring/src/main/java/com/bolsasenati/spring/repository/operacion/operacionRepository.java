package com.bolsasenati.spring.repository.operacion;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bolsasenati.spring.models.Operacion;

@Repository
public interface operacionRepository extends JpaRepository<Operacion, Integer> {

    List<Operacion> findByTareaId(Integer tareaId);

    @Query(value = "call sp_guardar_progreso_operacion(:idAprendiz, :idOperacion, :estado)" , nativeQuery = true)
    String guardarProgresoOperacion(@Param("idAprendiz") Integer idAprendiz, @Param("idOperacion") Integer idOperacion, @Param("estado") String estado);
}
