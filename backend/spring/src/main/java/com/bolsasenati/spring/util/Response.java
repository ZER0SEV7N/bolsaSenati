package com.bolsasenati.spring.util;

import lombok.AllArgsConstructor;
import lombok.Data;

//Payload de respuesta generico 
//Para estructuracion de respuestas de la API con un formato consistente
@Data
@AllArgsConstructor
public class Response <T> {
    private Boolean success;
    private String message;
    private T data;
}
