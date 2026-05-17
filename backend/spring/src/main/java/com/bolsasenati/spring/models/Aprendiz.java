package com.bolsasenati.spring.models;

<<<<<<< HEAD
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "aprendiz")
public class Aprendiz {

    @Id
    @Column(name = "idUsuario")
    private Integer idUsuario;

    @OneToOne
    @MapsId
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @Column(nullable = false)
    private String nombres;

    @Column(nullable = false)
    private String apellidos;

    @Column(name = "correo_personal")
    private String correoPersonal;

    private String telefono;

    @Column(nullable = false, unique = true)
    private String dni;

    @ManyToOne
    @JoinColumn(name = "idCarrera")
    private Carrera carrera;

    @ManyToOne
    @JoinColumn(name = "idPea")
    private Pea pea;

    @Enumerated(EnumType.STRING)
    private Ciclo ciclo;

    @Column(nullable = false)
    private String sede;
=======
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "aprendiz")
@Data
public class Aprendiz {

    @Id
    private Integer idaprendiz;

    @OneToOne
    @MapsId 
    @JoinColumn(name = "idaprendiz")
    private Usuario usuario;

    @Column(nullable = false, unique = true, name = "codigo_aprendiz")
    private String codigoAprendiz;

    @Column(nullable = false, unique = true, name = "correo_institucional")
    private String correoInstitucional;

    @ManyToOne
    @JoinColumn(name = "idcarrera", nullable = false)
    private Carrera carrera;

    @Column(nullable = false, columnDefinition = "enum('III','IV','V','VI') default 'III'")
    private String ciclo;

    @Column(columnDefinition = "json", nullable = true, name = "palabras_clave")
    private String palabrasClave;

    @Column(updatable = false, name = "create_at")
    private LocalDateTime createAt;

    @Column(insertable = false, name = "update_at")
    private LocalDateTime updateAt;

>>>>>>> origin/daniel
}
