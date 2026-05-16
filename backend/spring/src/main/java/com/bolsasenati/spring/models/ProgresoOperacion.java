package com.bolsasenati.spring.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "progreso_operacion")
public class ProgresoOperacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idAprendiz")
    private Usuario aprendiz;

    @ManyToOne
    @JoinColumn(name = "idOperacion")
    private Operacion operacion;

    @Enumerated(EnumType.STRING)
    private EstadoOperacion estado = EstadoOperacion.pendiente;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    public enum EstadoOperacion {
        pendiente, realizado
    }
}
