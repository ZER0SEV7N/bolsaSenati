package com.bolsasenati.spring.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "aprendiz")
public class Aprendiz {

    @Id
    @Column(name = "idUsuario")
    private Integer idUsuario;

    @OneToOne
    @MapsId
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @Column(nullable = false)
    private String nombres;

    @Column(nullable = false)
    private String apellidos;

    @Column(name = "correo_personal")
    private String correoPersonal;

    private String telefono;

    @Column(nullable = false, unique = true)
    private String dni;

    @ManyToOne
    @JoinColumn(name = "idCarrera")
    private Carrera carrera;

    @ManyToOne
    @JoinColumn(name = "idPea")
    private Pea pea;

    @Enumerated(EnumType.STRING)
    private Ciclo ciclo;

    @Column(nullable = false)
    private String sede;
}
