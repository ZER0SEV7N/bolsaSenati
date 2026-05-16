package com.bolsasenati.spring.models.dtos;

import lombok.Data;

@Data
public class createAprendizDto {
    
    private String nombres;
    private String apellidos;
    private String documento_identidad;
    private String correo_personal;
    private String password;
    private String telefono;
    private String codigoAprendiz;
    private Integer idCarrera;
    private String Ciclo = "III";
}
