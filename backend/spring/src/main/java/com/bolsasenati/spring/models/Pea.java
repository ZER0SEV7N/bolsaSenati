package com.bolsasenati.spring.models;

<<<<<<< HEAD
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "pea")
=======
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pea")
@Data
>>>>>>> origin/daniel
public class Pea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

<<<<<<< HEAD
    @Column(nullable = false)
    private String anio;

    private Boolean estado = true;

    @ManyToOne
    @JoinColumn(name = "idCarrera")
    private Carrera carrera;

    @Column(name = "create_at")
    private LocalDateTime createAt;
=======
    @Column(nullable = false, name = "year")
    private Integer year;

    @Column(name = "estado")
    private Boolean estado = true;

    @ManyToOne
    @JoinColumn(name = "idcarrera", nullable = false)
    private Carrera carrera;

    @Column(name = "create_at", updatable = false)
    private LocalDateTime createAt;

    @Column(name = "update_at", insertable = false)
    private LocalDateTime updateAt;
>>>>>>> origin/daniel
}
