package com.bolsasenati.spring.models.senati.dto;

import lombok.Data;

@Data
public class operacionDTO {
    private Integer id;
    private String operacion;
    private String descripcion;
    private String estado;
    private String createAt;
    private String updateAt;
}
