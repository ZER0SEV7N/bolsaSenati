package com.bolsasenati.spring.models;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "carrera")
@Data
public class Carrera {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, name = "carrera")
    private String carrera;

    @Column(nullable = false, unique = true, name = "codigo")
    private String codigo;

    @Column(name = "create_at", updatable = false)
    private LocalDateTime createAt;
    
    @Column(name = "update_at", insertable = false)
    private LocalDateTime updateAt;
}
