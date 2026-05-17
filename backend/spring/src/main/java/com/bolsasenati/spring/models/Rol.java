package com.bolsasenati.spring.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "rol")
@Data
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String rol;
}
