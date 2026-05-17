package com.bolsasenati.spring.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "empresa")
@Data
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 100)
    private String nombre;

    @Column(unique = true, length = 11)
    private String ruc;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(unique = true, length = 100)
    private String correo;

    @Column(length = 12)
    private String telefono;

    @Column(columnDefinition = "boolean default true")
    private Boolean estado = true;

    @CreationTimestamp
    @Column(name = "create_at", updatable = false)
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(name = "update_at")
    private LocalDateTime updateAt;
}
