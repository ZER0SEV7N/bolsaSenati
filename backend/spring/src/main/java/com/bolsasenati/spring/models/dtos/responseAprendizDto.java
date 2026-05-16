package com.bolsasenati.spring.models.dtos;

import lombok.Data;

@Data
public class responseAprendizDto {

    private Integer id;
    private String nombres;
    private String apellidos;
    private String documento_identidad;
    private String correo_personal;
    private String telefono;

    //Datos específicos del aprendiz
    private String codigoAprendiz;
    private String correo_institucional;
    private String carrera;
    private CarreraDto carreraDto;
    private String ciclo;

    @Data
    public static class CarreraDto {
        private Integer id;
        private String carrea;
    }
}
