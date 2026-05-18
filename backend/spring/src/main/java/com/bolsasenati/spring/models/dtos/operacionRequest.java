package com.bolsasenati.spring.models.dtos;

import lombok.Data;

@Data
public class operacionRequest {
    private Integer idAprendiz;
    private Integer idOperacion;
    private String estado;
}
