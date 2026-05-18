package com.bolsasenati.spring.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "instructor_seguimiento")
public class InstructorSeguimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @Column(name = "zona_asignada")
    private String zonaAsignada;

    @Column(name = "create_at", updatable = false)
    private LocalDateTime createAt;

    @Column(name = "update_at")
    private LocalDateTime updateAt;
}
