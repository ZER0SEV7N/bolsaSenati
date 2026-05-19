package com.bolsasenati.spring.services.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolsasenati.spring.models.Aprendiz;
import com.bolsasenati.spring.models.dtos.responseAprendizDto;
import com.bolsasenati.spring.models.dtos.updateAprendizDto;
import com.bolsasenati.spring.repository.usuarios.aprendizRepository;
import org.springframework.transaction.annotation.Transactional;
import com.bolsasenati.spring.repository.usuarios.distritoRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import com.bolsasenati.spring.models.Distrito;

@Service
public class aprendizService {

    @Autowired
    private aprendizRepository aprendizRepository;

    @Autowired
    private distritoRepository distritoRepository;

    @Autowired
    private authServices authServices;

    //Metodo para obtener los distritos de interes de un aprendiz
    @Transactional
    public responseAprendizDto actualizarIntereses (Integer idAprendiz, updateAprendizDto dto){
        
        //Buscar el aprendiz
        Aprendiz aprendiz = aprendizRepository.findByIdWithDistritos(idAprendiz);
        
        //Buscar las palabras clave y distritos de interes del aprendiz, y actualizar si es necesario
        if (dto.getPalabrasClave() != null) 
            aprendiz.setPalabrasClave(dto.getPalabrasClave());
        
        //Actualizar los distritos de interés del aprendiz
        if (dto.getIdDistritosInteres() != null) {
            List<Distrito> distritos = distritoRepository.findAllById(dto.getIdDistritosInteres());
            if (aprendiz.getDistritosInteres() == null) 
                aprendiz.setDistritosInteres(new HashSet<>());
            
            aprendiz.getDistritosInteres().clear();
            aprendiz.getDistritosInteres().addAll(distritos);            
        }

        Aprendiz savedAprendiz = aprendizRepository.saveAndFlush(aprendiz);

        responseAprendizDto responseDto = authServices.mapearAprendizADto(savedAprendiz.getUsuario());    
        
        responseDto.setPalabrasClave(savedAprendiz.getPalabrasClave());

        //Mapear los distritos de interes a nombres para el DTO de respuesta
        if (savedAprendiz.getDistritosInteres() != null) {
            Set<String> nombresDistritos = savedAprendiz.getDistritosInteres().stream()
                .map(Distrito::getDistrito)
                .collect(Collectors.toSet());
            responseDto.setDistritosInteres(nombresDistritos);
    
        }
        return responseDto;
    }

}
