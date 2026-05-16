-- Script para crear la base de datos y las tablas necesarias para el sistema de bolsa de trabajo del SENATI
drop database if exists bolsaSenati;
create database bolsaSenati;
use bolsaSenati;

-- Creación de tablas
-- Tabla de roles (Aprendiz, Instructor, Seguimiento, Monitor)
create table rol(
	id int auto_increment primary key,
    name char(50) not null unique
);

-- Tabla para los distritos (Vista: "Distritos Adicionales")
create table distrito (
    id int auto_increment primary key,
    nombre varchar(100) not null unique
);

create table usuario(
    id int auto_increment primary key,
    nombres char(100) not null,
    apellidos char(100) not null,
    documento_identidad char(12) unique,
    correo_personal varchar(100) unique,
    password varchar(255) not null,
    telefono char(12),
    idRol int references rol(id)
);

create table aprendiz(
    idaprendiz int references usuario(id),
    correo_institucional char(250),
    idcarrera int references carrera(id),
    ciclo enum("III","IV","V","VI") default 'III',
    palabras_clave json null,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp,
    primary key(idaprendiz)
);

create table carrera(
	id int auto_increment primary key,
    nombre char(100) not null unique, 
    codigo char(10) not null unique,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

create table pea(
	id int auto_increment primary key,
    anio char(4) not null,
    estado boolean default true,
    idCarrera int references carrera(id) on delete cascade,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

create table curso(
	id int auto_increment primary key,
    nombre char(100) not null,
    credito int not null check (credito >= 0),
    ciclo enum("I","II","III","IV","V","VI") default 'III',
    idPea int references pea(id) on delete cascade,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

create table tarea(
	id int auto_increment primary key,
    nombre char(100) not null,
    descripcion text,
    idCurso int references curso(id) on delete cascade,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

create table operacion(
	id int auto_increment primary key,
    nombre char(100) not null,
    descripcion text,
    idTarea int references tarea(id) on delete cascade,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

-- Registro de operaciones realizadas por el aprendiz (de aca sacamos
-- el promedio de todo curso, semestre, counts de operaciones y tareas por estado)
create table progreso_operacion (
    id int auto_increment primary key,
    idAprendiz int references usuario(id),
    idOperacion int references operacion(id), 
    nota decimal(5,2) check (nota >= 0 and nota <= 20),
    estado enum('no realizado', 'pendiente', 'realizado') default 'pendiente',
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp,
    unique(idAprendiz, idOperacion)
);

create table matricula_pea (
    id int auto_increment primary key,
    idAprendiz int references usuario(id) on delete cascade,
    idPea int references pea(id) on delete cascade,
    semestre varchar(10), -- ej: '2026-I'
    estado enum('En curso', 'Aprobado', 'Desaprobado') default 'En curso',
    unique(idAprendiz, idPea)
);

-- Tabla para la empresa
create table empresa(
    id int auto_increment primary key,
    nombre char(100) not null unique,
    ruc char(11) unique,
    descripcion text,
    correo char(100) unique,
    telefono char(12),
    estado boolean default true,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

-- Tabla para las ofertas laborales
create table oferta_laboral(
    id int auto_increment primary key,
    titulo char(100) not null,
    descripcion text,
    requisitos text,
    modalidad enum('Presencial', 'Remoto', 'Híbrido') default 'Presencial', 
    idDistrito int references distrito(id), 
    estado enum('Abierta', 'En pausa', 'Cerrada') default 'Abierta', 
    idEmpresa int references empresa(id) on delete cascade,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

-- Tabla para las postulaciones de los aprendices a las ofertas laborales
create table postulacion(
    id int auto_increment primary key,
    idAprendiz int references usuario(id),
    idOferta int references oferta_laboral(id),
    estado enum('pendiente', 'aceptada', 'rechazada') default 'pendiente',
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp,
    unique(idAprendiz, idOferta)
);

-- Tabla de Monitor
create table monitor(
    id int auto_increment primary key,
    idUsuario int references usuario(id),
    idEmpresa int references empresa(id) on delete cascade,
    cargo varchar(100), 
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);
-- Tabla de Seguimiento
create table seguimiento(
    id int auto_increment primary key,
    idUsuario int references usuario(id),
    zona_asignada varchar(100),
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

-- Tabla para vincular al aprendiz con las empresas (Prácticas Actuales y Previas)
create table historial_practica (
    id int auto_increment primary key,
    idAprendiz int references usuario(id) on delete cascade,
    idEmpresa int references empresa(id) on delete cascade,
    idMonitor int references monitor(id),
    cargo varchar(100) not null,
    fecha_inicio date not null,
    fecha_fin date null, -- Será NULL si es la empresa actual
    estado enum('actual', 'previa') default 'actual',
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

-- Tabla para el registro de visitas de seguimiento (Vista: "Últimas Visitas")
create table visita_seguimiento (
    id int auto_increment primary key,
    idAprendiz int references usuario(id) on delete cascade,
    idSeguimiento int references seguimiento(id),
    fecha_visita date not null,
    nota int check (nota >= 0 and nota <= 20),
    estado enum('Aprobado', 'Bajo', 'Pendiente') not null,
    create_at timestamp default current_timestamp
);

-- Tabla para los comentarios en el dashboard (Vista: "Comentarios")
create table comentario_avance (
    id int auto_increment primary key,
    idAprendiz int references usuario(id) on delete cascade,
    idAutor int references usuario(id), -- Puede ser el Monitor o el especialista de Seguimiento
    contenido text not null,
    fecha date not null,
    create_at timestamp default current_timestamp
);


-- Tabla intermedia para los distritos de interés laboral del aprendiz
create table aprendiz_distrito (
    idAprendiz int references usuario(id) on delete cascade,
    idDistrito int references distrito(id) on delete cascade,
    prioridad int, -- Para ordenar: Distrito N°1, Distrito N°2, etc.
    primary key (idAprendiz, idDistrito)
);
