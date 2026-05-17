package com.bolsasenati.spring.models;

import java.time.LocalDateTime;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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

    @ManyToMany
    @JoinTable(
        name = "aprendiz_distrito",
        joinColumns = @JoinColumn(name = "idAprendiz"),
        inverseJoinColumns = @JoinColumn(name = "idDistrito")
    )
    private Set<Distrito> distritosDeInteres;

    @CreationTimestamp
    @Column(updatable = false, name = "create_at")
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(insertable = false, name = "update_at")
    private LocalDateTime updateAt;

}
