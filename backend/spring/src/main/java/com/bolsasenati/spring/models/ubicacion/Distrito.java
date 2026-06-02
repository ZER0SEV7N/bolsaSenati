package com.bolsasenati.spring.models.ubicacion;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "distrito")
@Data
public class Distrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 100)
    private String distrito;

}
