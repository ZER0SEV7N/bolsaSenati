package com.bolsasenati.spring.models.dtos;

import java.util.List;

import lombok.Data;

@Data
public class tareaDTO {
    private Integer id;
    private String tarea;
    private String descripcion;
    private List<operacionDTO> operaciones; // <-- Aquí se anidan sus operaciones
    private String createAt;
    private String updateAt;
}
