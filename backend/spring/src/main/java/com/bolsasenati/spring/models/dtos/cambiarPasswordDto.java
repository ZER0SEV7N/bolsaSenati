package com.bolsasenati.spring.models.dtos;

import lombok.Data;

@Data
public class cambiarPasswordDto {
    private String actualPassword;
    private String nuevaPassword;
}
