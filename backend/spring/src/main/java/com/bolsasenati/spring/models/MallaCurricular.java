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

    @Column(columnDefinition = "enum('I','II','III','IV','V','VI') default 'I'")
    private String ciclo;
}
