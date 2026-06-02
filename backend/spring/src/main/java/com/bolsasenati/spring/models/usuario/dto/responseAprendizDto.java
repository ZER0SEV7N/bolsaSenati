package com.bolsasenati.spring.models.usuario.dto;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.Data;

@Data
@JsonPropertyOrder({
    "id",
    "nombres",
    "apellidos",
    "documentoIdentidad",
    "correoPersonal",
    "telefono",
    "codigoAprendiz",
    "correoInstitucional",
    "carreraDto",
    "ciclo",
    "palabrasClave",
    "rol",
    "avatar"
})
public class responseAprendizDto {

    private Integer id;
    private String nombres;
    private String apellidos;
    private String documentoIdentidad;
    private String correoPersonal;
    private String telefono;
    private String rol;

    //Datos específicos del aprendiz
    private String codigoAprendiz;
    private String correoInstitucional;

    @JsonPropertyOrder({
        "id",
        "carrera"
    })
    private CarreraDto carreraDto;
    private String ciclo;
    private List<String> palabrasClave; 
    private Set<String> distritosInteres;
    private String avatar;
    
    @Data
    public static class CarreraDto {
        private Integer id;
        private String carrera;
    }
}
