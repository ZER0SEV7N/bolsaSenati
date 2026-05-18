package com.bolsasenati.spring.repository.curso;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bolsasenati.spring.models.Curso;

@Repository
public interface cursoRepository extends JpaRepository<Curso, Integer> {
    @Query(value = "SELECT c.* FROM curso c " +
                   "INNER JOIN malla_curricular mc ON c.id = mc.idcurso " +
                   "INNER JOIN pea p ON mc.idpea = p.id " +
                   "WHERE p.idcarrera = :idCarrera AND mc.ciclo = :ciclo", 
           nativeQuery = true)
    List<Curso> findCursosByCarreraYCiclo(@Param("idCarrera") Integer idCarrera, @Param("ciclo") String ciclo);
}
