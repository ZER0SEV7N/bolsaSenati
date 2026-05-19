package com.bolsasenati.spring.services.usuario;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolsasenati.spring.models.Distrito;
import com.bolsasenati.spring.repository.usuarios.distritoRepository;

@Service
public class distritoService {

    @Autowired
    private distritoRepository distritoRepository;
    
    //Metodo para obtener todos los distritos disponibles
    public List<String> obtenerDistritos() {
        return distritoRepository.findAll().stream()
                .map(d -> d.getDistrito())
                .toList();
    }

    //Metodo para obtener los distritos de interes de un aprendiz
    public List<String> obtenerDistritosInteres(Integer idAprendiz) {
        return distritoRepository.findNombresDistritosByAprendizId(idAprendiz);
    }

    //Metodo para obtener un distrito por su id
    public Distrito obtenerDistritoPorId(Integer idDistrito) {
        return distritoRepository.findById(idDistrito).orElse(null);
    }
}
