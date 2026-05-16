package com.bolsasenati.spring.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "aprendiz")
@Data
public class Aprendiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idaprendiz;

    @Column(nullable = false, unique = true, name = "codigo_aprendiz")
    private String codigoAprendiz;

    @ManyToOne
    @JoinColumn(name = "idcarrera", nullable = false)
    private Carrera carrera;

    @Column(nullable = false, columnDefinition = "enum('III','IV','V','VI') default 'III'")
    private String ciclo;

    @Column(columnDefinition = "json", nullable = true, name = "palabras_clave")
    private String palabrasClave;

    @Column(updatable = false, name = "create_at")
    private LocalDateTime createAt;

    @Column(insertable = false, name = "update_at")
    private LocalDateTime updateAt;
}
