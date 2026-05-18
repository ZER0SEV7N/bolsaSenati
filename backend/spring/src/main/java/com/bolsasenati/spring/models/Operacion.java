package com.bolsasenati.spring.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "operacion")
@Data
public class Operacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "operacion")
    private String operacion;
    @Column(nullable = false, name = "descripcion")
    private String descripcion;
    

    @ManyToOne
    @JoinColumn(name = "idTarea" ,referencedColumnName = "id", nullable = false)
    private Tarea tarea;

    @CreationTimestamp
    @Column(updatable = false, name = "create_at")
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(insertable = false, name = "update_at")
    private LocalDateTime updateAt;
}
