package com.bolsasenati.spring.models.usuario.aprendiz;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.bolsasenati.spring.config.ListToStringConverter;
import com.bolsasenati.spring.models.senati.Carrera;
import com.bolsasenati.spring.models.ubicacion.Distrito;
import com.bolsasenati.spring.models.usuario.Usuario;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "aprendiz")
@Data
public class Aprendiz {

    @Id
    private Integer idAprendiz;

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

    @Convert(converter = ListToStringConverter.class)
    @Column(name = "palabras_clave", nullable = true)
    private List<String> palabrasClave;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "aprendiz_distrito",
        joinColumns = @JoinColumn(name = "idAprendiz"),
        inverseJoinColumns = @JoinColumn(name = "idDistrito")
    )
    private Set<Distrito> distritosInteres;

    @CreationTimestamp
    @Column(updatable = false, name = "create_at")
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(insertable = false, name = "update_at")
    private LocalDateTime updateAt;
}