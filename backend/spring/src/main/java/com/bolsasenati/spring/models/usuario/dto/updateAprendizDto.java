package com.bolsasenati.spring.models.usuario.dto;

import java.util.List;
import java.util.Set;

import lombok.Data;

@Data
public class updateAprendizDto {

    private Set<Integer> idDistritosInteres;
    private List<String> palabrasClave;

}
