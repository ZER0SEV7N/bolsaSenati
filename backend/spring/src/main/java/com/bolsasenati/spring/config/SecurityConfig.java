package com.bolsasenati.spring.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


//Clase de configuración de seguridad para la aplicación
@Component
public class SecurityConfig {

    @Autowired
    private jwtFilter jwtFilter;

    //Encriptador de contraseñas utilizando el delegating password encoder de Spring Security
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); //Utiliza bcrypt por defecto para encriptar las contraseñas
    }

    //Configuración de la cadena de filtros de seguridad
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource())) //Habilitamos CORS con una configuración personalizada
            .csrf(csrf -> csrf.disable()) //Deshabilitamos CSRF ya que usaremos JWT para la autenticación
            .sessionManagement(session ->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //Indicamos que no se deben crear sesiones, ya que la autenticación se manejará con JWT
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll() //Permitir acceso a las rutas de autenticación sin necesidad de estar autenticado
                .requestMatchers("/api/**").authenticated()
                .anyRequest().authenticated() //Requerir autenticación para cualquier otra ruta
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); //Agregamos nuestro filtro de JWT antes del filtro de autenticación de Spring Security
        return http.build();
    }

    //Configuración de CORS para permitir solicitudes desde el frontend
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); //Permitir solicitudes desde el frontend en localhost:3000
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS")); //Permitir todos los métodos HTTP (GET, POST, etc.)
        configuration.setAllowedHeaders(Arrays.asList("*")); //Permitir todas las cabeceras
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);//Aplicar esta configuración a todas las rutas
        return source;
    }
}
