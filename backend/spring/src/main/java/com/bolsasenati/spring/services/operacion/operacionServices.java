package com.bolsasenati.spring.services.operacion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolsasenati.spring.repository.senati.operacion.operacionRepository;
import com.bolsasenati.spring.repository.usuarios.aprendiz.aprendizRepository;

@Service
public class operacionServices {
    @Autowired private operacionRepository operacionRepository;
    @Autowired private aprendizRepository aprendizRepository;

    public String guardarProgresoOperacion(Integer idAprendiz, Integer idOperacion, String estado) {
        if(aprendizRepository.findById(idAprendiz).isEmpty()) {
            return "Aprendiz no encontrado";
        }

        if (estado == null || (!estado.equals("pendiente") && !estado.equals("realizado"))) {
            return "Estado no valido (acepta 'pendiente' o 'realizado')";
        }
        return operacionRepository.guardarProgresoOperacion(idAprendiz, idOperacion, estado);
    }
}
