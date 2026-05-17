package com.bolsasenati.spring.models;

<<<<<<< HEAD
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "curso")
=======
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "curso")
@Data
>>>>>>> origin/daniel
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

<<<<<<< HEAD
    @Column(nullable = false)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "idPea")
    private Pea pea;

    @Column(name = "create_at")
    private LocalDateTime createAt;
=======
    @Column(nullable = false, unique = true, name = "curso")
    private String curso;

    @Column(nullable = false, name = "creditos")
    private Integer creditos;

    @Column(name = "create_at", updatable = false)
    private LocalDateTime createAt;

    @Column(name = "update_at", insertable = false)
    private LocalDateTime updateAt;
>>>>>>> origin/daniel
}
