package com.bolsasenati.spring.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "curso")
@Data
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, name = "curso")
    private String curso;

    @Column(nullable = false, name = "credito")
    private Integer credito;

    @Column(name = "create_at", updatable = false)
    private LocalDateTime createAt;

    @Column(name = "update_at", insertable = false)
    private LocalDateTime updateAt;
}
