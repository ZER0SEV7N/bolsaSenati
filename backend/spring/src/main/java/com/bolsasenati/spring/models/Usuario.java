package com.bolsasenati.spring.models;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "nombres")
    private String nombres;

    @Column(nullable = false, name = "apellidos")
    private String apellidos;

    @Column(nullable = false, unique = true)
    private String dni;

    @Column(nullable = false, name = "telefono")
    private String telefono;

    @Column(nullable = false, unique = true, name = "emailpersonal")
    private String emailpersonal;

    @Column(nullable = false, unique = true, name = "emailinstitucional")
    private String emailinstitucional;

    @Column(nullable = false, name = "password")
    private String password;

    @ManyToOne
    @JoinColumn(name = "rol_id", nullable = false)
    private Rol rol;
}
