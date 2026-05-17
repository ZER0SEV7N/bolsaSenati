package com.bolsasenati.spring.repository.curso;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bolsasenati.spring.models.Curso;

@Repository
public interface cursoRepository extends JpaRepository<Curso, Integer> {
    
}
