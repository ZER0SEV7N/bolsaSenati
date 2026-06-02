package com.bolsasenati.spring.models.usuario.dto;

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
    private String ciclo = "III";
}
