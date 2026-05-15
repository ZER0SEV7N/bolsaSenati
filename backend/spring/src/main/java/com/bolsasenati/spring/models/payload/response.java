package com.bolsasenati.spring.models.payload;

//Payload de respuesta generico 
//Para estructuracion de respuestas de la API con un formato consistente
public class response <T> {
    private Boolean success;
    private String message;
    private T data;

    public response(Boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    
}
