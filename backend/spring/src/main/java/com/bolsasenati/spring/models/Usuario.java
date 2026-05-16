package com.bolsasenati.spring.models;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "usuarios")
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "nombres")
    private String nombres;

    @Column(nullable = false, name = "apellidos")
    private String apellidos;

    @Column(nullable = false, unique = true)
    private String documento_identidad;

    @Column(nullable = false, name = "telefono")
    private String telefono;

    @Column(nullable = false, unique = true, name = "correo_personal")
    private String correo_personal;

    @Column(nullable = false, name = "password")
    private String password;

    @ManyToOne
    @JoinColumn(name = "idrol", nullable = false)
    private Rol rol;

    @Column(name = "create_at", updatable = false)
    private LocalDateTime createAt;

    @Column(name = "update_at", insertable = false)
    private LocalDateTime updateAt;
}
