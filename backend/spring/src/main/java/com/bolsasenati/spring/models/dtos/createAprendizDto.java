package com.bolsasenati.spring.models.dtos;

import lombok.Data;

@Data
public class createAprendizDto {
    
    private String nombres;
    private String apellidos;
    private String documentoIdentidad;
    private String correoPersonal;
    private String password;
    private String telefono;
    private String codigoAprendiz;
    private Integer idCarrera;
    private String Ciclo = "III";
}
