package com.bolsasenati.spring.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "usuario")
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "nombres")
    private String nombres;

    @Column(nullable = false, name = "apellidos")
    private String apellidos;

    @Column(name = "documento_identidad", unique = true, length = 12)
    private String documentoIdentidad;

    @Column(name = "correo_personal", unique = true, length = 150)
    private String correoPersonal;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(length = 12)
    private String telefono;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idrol")
    private Rol rol;

    @CreationTimestamp
    @Column(name = "create_at", updatable = false)
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(name = "update_at", insertable = false)
    private LocalDateTime updateAt;
}
