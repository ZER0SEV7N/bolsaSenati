package com.bolsasenati.spring.models;

import jakarta.persistence.*;
import lombok.Data;
<<<<<<< HEAD
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tarea")
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "idCurso")
    private Curso curso;

    @Column(name = "create_at")
    private LocalDateTime createAt;
=======

@Entity
@Table(name = "tarea")
@Data
public class Tarea {

>>>>>>> origin/daniel
}
