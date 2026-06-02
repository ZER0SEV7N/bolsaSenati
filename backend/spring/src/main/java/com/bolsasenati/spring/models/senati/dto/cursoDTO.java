package com.bolsasenati.spring.models.senati.dto;

import java.util.List;

import lombok.Data;

@Data
public class cursoDTO {
    private Integer id;
    private String nombre;
    private Integer credito;
    private List<tareaDTO> tareas;
    private String createAt;
    private String updateAt;
}
