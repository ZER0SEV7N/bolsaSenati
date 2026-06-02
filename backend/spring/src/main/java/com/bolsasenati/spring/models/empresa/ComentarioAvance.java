package com.bolsasenati.spring.models.empresa;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.bolsasenati.spring.models.usuario.Usuario;

@Data
@Entity
@Table(name = "comentario_avance")
public class ComentarioAvance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Aprendiz que recibe el comentario
    @ManyToOne
    @JoinColumn(name = "idAprendiz")
    private Usuario aprendiz;

    // Instructor que escribe el comentario
    @ManyToOne
    @JoinColumn(name = "idInstructor")
    private Usuario instructor;

    @Column(precision = 5, scale = 2)
    private BigDecimal nota;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String contenido;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(name = "create_at", updatable = false)
    private LocalDateTime createAt;
}
