package com.bolsasenati.spring.repository.tarea;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bolsasenati.spring.models.Tarea;

@Repository
public interface tareaRepository extends JpaRepository<Tarea, Integer> {
    List<Tarea> findByCursoId(Integer cursoId);
}
