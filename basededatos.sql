DROP DATABASE IF EXISTS bolsaSenati;
CREATE DATABASE bolsaSenati;
USE bolsaSenati;


CREATE TABLE rol (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name CHAR(50) NOT NULL UNIQUE
);

CREATE TABLE carrera (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    nombre              CHAR(100) NOT NULL UNIQUE,
    codigo              CHAR(10)  NOT NULL UNIQUE,
    duracion_semestres  INT DEFAULT 6
);


CREATE TABLE empresa (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    nombre   VARCHAR(150) NOT NULL,
    ruc      CHAR(11)     NOT NULL UNIQUE,
    sector   VARCHAR(100),
    telefono CHAR(12),
    correo   VARCHAR(100),
    direccion VARCHAR(200),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE convenio (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    idEmpresa  INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin    DATE,
    estado       ENUM('activo', 'inactivo', 'vencido') DEFAULT 'activo',
    descripcion  TEXT,
    create_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idEmpresa) REFERENCES empresa(id) ON DELETE CASCADE
);

CREATE TABLE historial_convenio (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    idConvenio  INT NOT NULL,
    cambio      VARCHAR(255) NOT NULL,
    fecha       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idConvenio) REFERENCES convenio(id) ON DELETE CASCADE
);


CREATE TABLE usuario (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    correo      VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    idRol       INT,
    FOREIGN KEY (idRol) REFERENCES rol(id)
);


CREATE TABLE pea (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    anio      CHAR(4)  NOT NULL,
    estado    BOOLEAN  DEFAULT TRUE,
    idCarrera INT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idCarrera) REFERENCES carrera(id) ON DELETE CASCADE
);


CREATE TABLE aprendiz (
    idUsuario      INT PRIMARY KEY,
    nombres        CHAR(100) NOT NULL,
    apellidos      CHAR(100) NOT NULL,
    correo_personal CHAR(250),
    telefono       CHAR(12),
    dni            CHAR(8)   NOT NULL UNIQUE,
    idCarrera      INT,
    idPea          INT,
    ciclo          ENUM('IV','V','VI') DEFAULT 'IV',
    sede           CHAR(100) NOT NULL,
    palabras_clave JSON      NULL,
    FOREIGN KEY (idUsuario)  REFERENCES usuario(id),
    FOREIGN KEY (idCarrera)  REFERENCES carrera(id),
    FOREIGN KEY (idPea)      REFERENCES pea(id)
);


CREATE TABLE curso (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    nombre    CHAR(100) NOT NULL,
    idPea     INT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idPea) REFERENCES pea(id) ON DELETE CASCADE
);

CREATE TABLE tarea (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    nombre    CHAR(100) NOT NULL,
    idCurso   INT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idCurso) REFERENCES curso(id) ON DELETE CASCADE
);

CREATE TABLE operacion (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    nombre    CHAR(100) NOT NULL,
    idTarea   INT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idTarea) REFERENCES tarea(id) ON DELETE CASCADE
);


CREATE TABLE progreso_operacion (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    idAprendiz     INT,
    idOperacion    INT,
    estado         ENUM('pendiente','realizado') DEFAULT 'pendiente',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (idAprendiz, idOperacion),
    FOREIGN KEY (idAprendiz)  REFERENCES usuario(id),
    FOREIGN KEY (idOperacion) REFERENCES operacion(id)
);