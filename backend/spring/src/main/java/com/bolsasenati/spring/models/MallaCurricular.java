package com.bolsasenati.spring.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "malla_curricular")
@Data
public class MallaCurricular {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idpea", nullable = false)
    private Pea pea;

    @ManyToOne
    @JoinColumn(name = "idcurso", nullable = false)
    private Curso curso;

    @Column(nullable = false, columnDefinition = "ENUM('I','II','III','IV','V','VI') default 'I'")
    @Enumerated(EnumType.STRING)
    private String ciclo;
}
