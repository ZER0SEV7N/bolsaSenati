package com.bolsasenati.spring.repository.usuarios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bolsasenati.spring.models.usuario.Rol;

public interface rolRepository extends JpaRepository<Rol, Integer> {

}
