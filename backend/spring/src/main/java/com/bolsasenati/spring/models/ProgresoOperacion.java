package com.bolsasenati.spring.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "progreso_operacion")
@Data
public class ProgresoOperacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idAprendiz", nullable = false)
    private Aprendiz aprendiz;

    @ManyToOne
    @JoinColumn(name = "idOperacion", nullable = false)
    private Operacion operacion;

    @Enumerated(EnumType.STRING)
    private EstadoOperacion estado = EstadoOperacion.pendiente;

    @CreationTimestamp
    @Column(updatable = false, name = "create_at")
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(insertable = false, name = "update_at")
    private LocalDateTime updateAt;


    // Definición del enum para el estado de la operación
    public enum EstadoOperacion {
        pendiente, realizado
    }
}

