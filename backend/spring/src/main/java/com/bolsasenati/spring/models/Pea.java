package com.bolsasenati.spring.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "pea")
public class Pea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String anio;

    private Boolean estado = true;

    @ManyToOne
    @JoinColumn(name = "idCarrera")
    private Carrera carrera;

    @Column(name = "create_at")
    private LocalDateTime createAt;
}
