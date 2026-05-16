-- Script para crear la base de datos y las tablas necesarias para el sistema de bolsa de trabajo del SENATI
drop database if exists bolsaSenati;
create database bolsaSenati;
use bolsaSenati;

-- Creación de tablas
-- Tabla de roles (Aprendiz, Instructor, Seguimiento, Monitor)
create table rol(
	id int auto_increment primary key,
    rol char(50) not null unique
);

-- Tabla para los distritos (Vista: "Distritos Adicionales")
create table distrito (
    id int auto_increment primary key,
    distrito varchar(100) not null unique
);

-- Tabla para los datos generales del usuario sin importar su rol
create table usuario(
    id int auto_increment primary key,
    nombres char(100) not null,
    apellidos char(100) not null,
    documento_identidad char(12) unique,
    correo_personal varchar(150) unique,
    password varchar(255) not null,
    telefono char(12),
    idrol int references rol(id),
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

-- Tabla específica para los aprendices, con sus datos adicionales
create table aprendiz(
    idaprendiz int references usuario(id),
    codigo_aprendiz char(9) not null unique, 
    correo_institucional varchar(150) unique,
    idcarrera int references carrera(id),
    ciclo enum("III","IV","V","VI") default 'III',
    palabras_clave json null,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp,
    primary key(idaprendiz)
);
-- Catálogo de Carreras 
create table carrera(
    id int auto_increment primary key,
    carrera char(100) not null unique, 
    codigo char(10) not null unique,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

-- Catálogo de Cursos 
create table curso(
    id int auto_increment primary key,
    curso char(100) not null unique,
    credito int not null check (credito >= 0),
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

-- El PEA 
create table pea(
    id int auto_increment primary key,
    year char(4) not null,
    estado boolean default true,
    idcarrera int references carrera(id) on delete cascade, -- El PEA sabe de qué carrera es
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

-- Malla Curricular (Relación N:M entre PEA y Curso, con un atributo adicional "ciclo" para indicar en qué ciclo se dicta el curso dentro del PEA)
create table malla_curricular(
    id int auto_increment primary key,
    idpea int references pea(id) on delete cascade,
    idcurso int references curso(id) on delete cascade,
    ciclo enum("I","II","III","IV","V","VI") default 'I',
    unique(idpea, idcurso)
);

-- Las Tareas 
create table tarea(
    id int auto_increment primary key,
    tarea char(100) not null,
    descripcion text,
    idCurso int references curso(id) on delete cascade, -- La tarea vuelve a ser hija del curso
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

-- Las Operaciones 
create table operacion(
    id int auto_increment primary key,
    operacion char(100) not null,
    descripcion text,
    idTarea int references tarea(id) on delete cascade,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);

-- Registro de operaciones
create table progreso_operacion (
    id int auto_increment primary key,
    idAprendiz int references usuario(id),
    idOperacion int references operacion(id), 
    estado enum('no realizado', 'pendiente', 'realizado') default 'pendiente',
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp,
    unique(idAprendiz, idOperacion)
);

-- Matrícula
create table matricula(
    id int auto_increment primary key,
    idAprendiz int references usuario(id) on delete cascade,
    idPea int references pea(id) on delete cascade,
    semestre varchar(10), 
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

-- Tabla de instructor seguimiento
create table instructor_seguimiento(
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
    idSeguimiento int references instructor_seguimiento(id),
    fecha_visita date not null,
    nota int check (nota >= 0 and nota <= 20),
    estado enum('Aprobado', 'Bajo', 'Pendiente') not null,
    create_at timestamp default current_timestamp
);

-- Tabla para los comentarios en el dashboard (Vista: "Comentarios")
create table comentario_avance (
    id int auto_increment primary key,
    idAprendiz int references usuario(id) on delete cascade,
    idInstructor int references usuario(id), 
    nota decimal(5,2) null check (nota >= 0 and nota <= 20),
    contenido text not null,
    fecha date not null,
    create_at timestamp default current_timestamp
);

-- Tabla para los distritos de interés del aprendiz (Vista: "Distritos Adicionales")
create table aprendiz_distrito (
    idAprendiz int references usuario(id) on delete cascade,
    idDistrito int references distrito(id) on delete cascade,
    primary key (idAprendiz, idDistrito)
);
