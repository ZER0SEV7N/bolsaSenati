package com.bolsasenati.spring.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "monitor")
@Data
public class Monitor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario; 
    
    @OneToOne
    @JoinColumn(name = "idEmpresa")
    private Empresa empresa;

    private String cargo;

    @CreationTimestamp
    @Column(updatable = false, name = "create_at")
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(insertable = false, name = "update_at")
    private LocalDateTime updateAt;
}
