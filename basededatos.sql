drop database if exists bolsaSenati;
create database bolsaSenati;
use bolsaSenati;

create table rol(
	id int auto_increment primary key,
    name char(50) not null unique
);

create table usuario(
    id int auto_increment primary key,
    correo varchar(100) not null unique,
    contrasenia varchar(255) not null,
    idRol int references rol(id)
);

create table aprendiz(
    idUsuario int references usuario(id),
    nombres char(100) not null,
    apellidos char(100) not null,
    correo_personal char(250),
    telefono char(12) ,
    dni char(8) not null unique,
    idCarrera int references carrera(id),
    idPea int references pea(id),
    ciclo enum("IV","V","VI") default 'IV',
    sede char(100) not null,
    palabras_clave json null,
    primary key(idUsuario)
);

create table carrera(
	id int auto_increment primary key,
    nombre char(100) not null unique, 
    codigo char(10) not null unique, 
    duracion_semestres int default 6  -- Carrera tiene 6 semestres default
);

create table pea(
	id int auto_increment primary key,
    anio char(4) not null,
    estado boolean default true,
    idCarrera int references carrera(id) on delete cascade,
    create_at timestamp default current_timestamp
);

create table curso(
	id int auto_increment primary key,
    nombre char(100) not null,
    -- credito int not null check (credito >= 0), (duda si va o no)
    idPea int references pea(id) on delete cascade,
    create_at timestamp default current_timestamp
);

create table tarea(
	id int auto_increment primary key,
    nombre char(100) not null,
    idCurso int references curso(id) on delete cascade,
    create_at timestamp default current_timestamp
);

create table operacion(
	id int auto_increment primary key,
    nombre char(100) not null,
    idTarea int references tarea(id) on delete cascade,
    create_at timestamp default current_timestamp
);

-- Registro de operaciones realizadas por el aprendiz (de aca sacamos
-- el promedio de todo curso, semestre, counts de operaciones y tareas por estado)
create table progreso_operacion (
    id int auto_increment primary key,
    idAprendiz int references usuario(id),
    idOperacion int references operacion(id),
    estado enum('pendiente', 'realizado') default 'pendiente',
    fecha_registro timestamp default current_timestamp on update current_timestamp,
    unique(idAprendiz, idOperacion)
);

