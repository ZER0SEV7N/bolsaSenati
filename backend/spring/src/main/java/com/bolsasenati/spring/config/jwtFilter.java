package com.bolsasenati.spring.config;

import java.util.ArrayList;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.stereotype.Component;
import com.bolsasenati.spring.services.jwtServices;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//Componente de filtro de JWT para interceptar las solicitudes y validar el token JWT
@Component
public class jwtFilter extends OncePerRequestFilter {

    @Autowired
    private jwtServices jwtServices;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
        throws IOException, ServletException {

        final String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer")){
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7); //Extraemos el token eliminando el prefijo "Bearer "

        if(!jwtServices.validarToken(token)){
            filterChain.doFilter(request, response);
            return;
        }

        final String email = jwtServices.extraerEmail(token);

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
            email, null, new ArrayList<>());

        SecurityContextHolder.getContext().setAuthentication(auth);
        filterChain.doFilter(request, response);
    }


}
