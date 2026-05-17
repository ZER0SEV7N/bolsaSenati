package com.bolsasenati.spring.models.dtos;

import lombok.Data;

@Data
public class responseAprendizDto {

    private Integer id;
    private String nombres;
    private String apellidos;
    private String documentoIdentidad;
    private String correoPersonal;
    private String telefono;

    //Datos específicos del aprendiz
    private String codigoAprendiz;
    private String correoInstitucional;
    private String carrera;
    private CarreraDto carreraDto;
    private String ciclo;

    @Data
    public static class CarreraDto {
        private Integer id;
        private String carrea;
    }
}
