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

-- Catálogo de Carrera
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

-- Tabla para los datos generales del usuario sin importar su rol
create table usuario(
    id int auto_increment primary key,
    nombres char(100) not null,
    apellidos char(100) not null,
    documento_identidad char(12) unique,
    correo_personal varchar(150) unique,
    password varchar(255) not null,
    telefono char(12),
    idrol int,
    iddistrito int null references distrito(id),
    avatar varchar(255) null,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp,
    foreign key (idrol) references rol(id)
);

-- Tabla específica para los aprendices, con sus datos adicionales
create table aprendiz(
    idaprendiz int primary key,
    codigo_aprendiz char(9) not null unique, 
    correo_institucional varchar(150) unique,
    idcarrera int,
    ciclo enum("III","IV","V","VI") default 'III',
    palabras_clave json null,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp,
    foreign key (idaprendiz) references usuario(id),
    foreign key (idcarrera) references carrera(id)
);

-- Tabla para los distritos de interés del aprendiz (Vista: "Distritos Adicionales")
create table aprendiz_distrito (
    idAprendiz int,
    idDistrito int,
    primary key (idAprendiz, idDistrito),
    foreign key (idAprendiz) references usuario(id) on delete cascade,
    foreign key (idDistrito) references distrito(id) on delete cascade
);

-- El PEA 
create table pea(
    id int auto_increment primary key,
    year char(4) not null,
    estado boolean default true,
    idcarrera int,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp,
    foreign key (idcarrera) references carrera(id) on delete cascade
);

-- Malla Curricular (Relación N:M entre PEA y Curso, con un atributo adicional "ciclo" para indicar en qué ciclo se dicta el curso dentro del PEA)
CREATE TABLE malla_curricular (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    idpea   INT,
    idcurso INT,
    ciclo   ENUM('I','II','III','IV','V','VI') DEFAULT 'I',
    UNIQUE (idpea, idcurso),
    FOREIGN KEY (idpea)   REFERENCES pea(id)   ON DELETE CASCADE,
    FOREIGN KEY (idcurso) REFERENCES curso(id) ON DELETE CASCADE
);

-- Las Tareas 
CREATE TABLE tarea (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    tarea       CHAR(100) NOT NULL,
    descripcion TEXT,
    idCurso     INT,
    create_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idCurso) REFERENCES curso(id) ON DELETE CASCADE
);

-- Las Operaciones 
CREATE TABLE operacion (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    operacion   CHAR(100) NOT NULL,
    descripcion TEXT,
    idTarea     INT,
    create_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idTarea) REFERENCES tarea(id) ON DELETE CASCADE
);

-- Registro de operaciones
CREATE TABLE progreso_operacion (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    idAprendiz  INT,
    idOperacion INT,
    estado      ENUM('no realizado','pendiente','realizado') DEFAULT 'pendiente',
    create_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (idAprendiz, idOperacion),
    FOREIGN KEY (idAprendiz)  REFERENCES usuario(id),
    FOREIGN KEY (idOperacion) REFERENCES operacion(id)
);

-- Matrícula
CREATE TABLE matricula (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    idAprendiz INT,
    idPea      INT,
    semestre   VARCHAR(10),
    estado     ENUM('En curso','Aprobado','Desaprobado') DEFAULT 'En curso',
    UNIQUE (idAprendiz, idPea),
    FOREIGN KEY (idAprendiz) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (idPea)      REFERENCES pea(id)     ON DELETE CASCADE
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
CREATE TABLE oferta_laboral (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    titulo      CHAR(100) NOT NULL,
    descripcion TEXT,
    requisitos  TEXT,
    modalidad   ENUM('Presencial','Remoto','Híbrido') DEFAULT 'Presencial',
    idDistrito  INT,
    estado      ENUM('Abierta','En pausa','Cerrada')  DEFAULT 'Abierta',
    idEmpresa   INT,
    create_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idDistrito) REFERENCES distrito(id),
    FOREIGN KEY (idEmpresa)  REFERENCES empresa(id) ON DELETE CASCADE
);

-- Tabla para las postulaciones de los aprendices a las ofertas laborales
CREATE TABLE postulacion (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    idAprendiz INT,
    idOferta   INT,
    estado     ENUM('pendiente','aceptada','rechazada') DEFAULT 'pendiente',
    create_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (idAprendiz, idOferta),
    FOREIGN KEY (idAprendiz) REFERENCES usuario(id),
    FOREIGN KEY (idOferta)   REFERENCES oferta_laboral(id)
);

-- Tabla de Monitor
CREATE TABLE monitor (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    idEmpresa INT,
    cargo     VARCHAR(100),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuario(id),
    FOREIGN KEY (idEmpresa) REFERENCES empresa(id) ON DELETE CASCADE
);

-- Tabla de instructor seguimiento
CREATE TABLE instructor_seguimiento (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario     INT,
    zona_asignada VARCHAR(100),
    create_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuario(id)
);

-- Tabla para vincular al aprendiz con las empresas (Prácticas Actuales y Previas)
CREATE TABLE historial_practica (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    idAprendiz  INT,
    idEmpresa   INT,
    idMonitor   INT,
    cargo       VARCHAR(100) NOT NULL,
    fecha_inicio DATE        NOT NULL,
    fecha_fin    DATE        NULL,         -- NULL = empresa actual
    estado      ENUM('actual','previa') DEFAULT 'actual',
    create_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idAprendiz) REFERENCES usuario(id)  ON DELETE CASCADE,
    FOREIGN KEY (idEmpresa)  REFERENCES empresa(id)  ON DELETE CASCADE,
    FOREIGN KEY (idMonitor)  REFERENCES monitor(id)
);

-- Tabla para el registro de visitas de seguimiento (Vista: "Últimas Visitas")
CREATE TABLE visita_seguimiento (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    idAprendiz     INT,
    idSeguimiento  INT,
    fecha_visita   DATE NOT NULL,
    nota           INT  CHECK (nota >= 0 AND nota <= 20),
    estado         ENUM('Aprobado','Bajo','Pendiente') NOT NULL,
    create_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idAprendiz)    REFERENCES usuario(id)               ON DELETE CASCADE,
    FOREIGN KEY (idSeguimiento) REFERENCES instructor_seguimiento(id)
);

-- Tabla para los comentarios en el dashboard (Vista: "Comentarios")
CREATE TABLE comentario_avance (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    idAprendiz   INT,
    idInstructor INT,
    nota         DECIMAL(5,2) NULL CHECK (nota >= 0 AND nota <= 20),
    contenido    TEXT NOT NULL,
    fecha        DATE NOT NULL,
    create_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idAprendiz)   REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (idInstructor) REFERENCES usuario(id)
);

-- Insertar roles
insert into rol values 
(null, 'Aprendiz'), 
(null, 'Instructor'), 
(null, 'Seguimiento'), 
(null, 'Monitor');

-- Insertar distritos 
insert distrito  values
(null, 'Ancón'),
(null, 'Ate'),
(null, 'Barranco'),
(null, 'Breña'),
(null, 'Carabayllo'),
(null, 'Cercado de Lima'),
(null, 'Chaclacayo'),
(null, 'Chorrillos'),
(null, 'Cieneguilla'),
(null, 'Comas'),
(null, 'El agustino'),
(null, 'Independencia'),
(null, 'Jesús maría'),
(null, 'La molina'),
(null, 'La victoria'),
(null, 'Lince'),
(null, 'Los olivos'),
(null, 'Lurigancho'),
(null, 'Lurín'),
(null, 'Magdalena del mar'),
(null, 'Miraflores'),
(null, 'Pachacámac'),
(null, 'Pucusana'),
(null, 'Pueblo libre'),
(null, 'Puente piedra'),
(null, 'Punta hermosa'),
(null, 'Punta negra'),
(null, 'Rímac'),
(null, 'San bartolo'),
(null, 'San borja'),
(null, 'San isidro'),
(null, 'San Juan de Lurigancho'),
(null, 'San Juan de Miraflores'),
(null, 'San Luis'),
(null, 'San Martin de Porres'),
(null, 'San Miguel'),
(null, 'Santa Anita'),
(null, 'Santa María del Mar'),
(null, 'Santa Rosa'),
(null, 'Santiago de Surco'),
(null, 'Surquillo'),
(null, 'Villa el Salvador'),
(null, 'Villa Maria del Triunfo');

-- Insertar carreras (Ejemplo)
insert carrera (carrera, codigo) values
('Desarrollo de Software', 'PDSD'),
('Redes y Comunicaciones', 'PDRC'),
('Mecatrónica', 'PDM'),
('Administración de Empresas', 'PDAE'),
('Marketing Digital', 'PDMD'),
('Diseño Gráfico', 'PDG'),
('Logística', 'PDL'),
('Seguridad Informática', 'PDSI'),
('Inteligencia Artificial', 'PDIA'),
('Ciberseguridad', 'PDC');

-- Insertar cursos (Ejemplo)
insert curso (curso, credito) values
('Programación Web', 20),
('Base de Datos', 23),
('Redes de Computadoras', 25),
('Sistemas Operativos', 15),
('Ingeniería de Software', 19),
('Diseño de Interfaces', 10),
('Marketing Digital', 17),
('Gestión de Proyectos', 20),
('Seguridad Informática', 21),
('Inteligencia Artificial', 26),
('Maquinas virtuales', 27),
('Java Fundamental', 22),
('Python para Data Science', 24),
('Ciberseguridad en la Nube', 18),
('Logística y Cadena de Suministro', 16),
('Diseño Gráfico con Adobe', 14),
('Administración de Empresas', 20),
('Redes y Comunicaciones', 23),
('Mecatrónica', 25),
('Desarrollo de Software I', 30);
