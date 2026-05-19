package com.bolsasenati.spring.models;

import java.time.LocalDateTime;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "historial_practica")
@Data
public class HistorialPractica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "idAprendiz" ,nullable = false)
    private Aprendiz aprendiz;

    @OneToOne
    @JoinColumn(name = "idEmpresa" ,nullable = false)
    private Empresa empresa;

    @OneToOne
    @JoinColumn(name = "idMonitor" ,nullable = false)
    private Monitor monitor;

    private String cargo;
    private Date fechaInicio;
    private Date fechaFin;

    @Column(columnDefinition = "enum('actual', 'previa') default 'actual'")
    private String estado;

    @CreationTimestamp
    @Column(updatable = false, name = "create_at")
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(insertable = false, name = "update_at")
    private LocalDateTime updateAt;

}
