package com.bolsasenati.spring.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "visita_seguimiento")
public class VisitaSeguimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Aprendiz visitado — columna exacta: idAprendiz
    @ManyToOne
    @JoinColumn(name = "idAprendiz")
    private Usuario aprendiz;

    // Instructor que realizo la visita — columna exacta: idSeguimiento
    @ManyToOne
    @JoinColumn(name = "idSeguimiento")
    private InstructorSeguimiento instructorSeguimiento;

    @Column(name = "fecha_visita", nullable = false)
    private LocalDate fechaVisita;

    @Column(name = "nota")
    private Integer nota;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private EstadoVisita estado;

    @Column(name = "create_at", updatable = false)
    private LocalDateTime createAt;

    public enum EstadoVisita {
        Aprobado, Bajo, Pendiente
    }
}
