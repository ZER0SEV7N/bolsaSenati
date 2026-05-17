package com.bolsasenati.spring.models.dtos;

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
    "ciclo"
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
    private String carrera;

    @JsonPropertyOrder({
        "id",
        "carrera"
    })
    private CarreraDto carreraDto;
    private String ciclo;

    @Data
    public static class CarreraDto {
        private Integer id;
        private String carrera;
    }
}
