package com.bolsasenati.spring.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tarea")
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, name = "tarea")
    private String tarea;
    @Column(nullable = false, name = "descripcion")
    private String descripcion;
    

    @ManyToOne
    @JoinColumn(name = "idCurso", referencedColumnName = "id", nullable = false)
    private Curso curso;

    @CreationTimestamp
    @Column(updatable = false, name = "create_at")
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(insertable = false, name = "update_at")
    private LocalDateTime updateAt;
}
