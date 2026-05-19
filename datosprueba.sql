-- Datos de prueba para la base de datos de la bolsa de trabajo del SENATI
use bolsaSenati;

-- Datos para la tabla tarea
insert tarea (tarea, descripcion, idCurso) values
-- Tareas para el Curso 1: Programación Web
('Configuración del Entorno Frontend', 'Configurar el espacio de trabajo local para el desarrollo de la aplicación web.', 1),
('Maquetación de la Interfaz de Usuario', 'Crear la estructura y estilos del diseño web responsive.', 1),
('Integración con APIs y Backend', 'Consumir servicios REST para dinamizar la interfaz de usuario.', 1),

-- Tareas para el Curso 2: Base de Datos
('Modelado Entidad-Relación', 'Diseñar la estructura lógica y relacional de la base de datos.', 2),
('Implementación de Programación en BD', 'Crear la lógica programable directamente en el servidor MySQL.', 2),

-- Tareas para el Curso 5: Ingeniería de Software
('Diseño de Arquitectura de Software', 'Definir la estructura general y patrones de diseño del sistema.', 5),
('Gestión de Proyectos con Metodologías Ágiles', 'Aplicar Scrum o Kanban para organizar el desarrollo del proyecto.', 5);

INSERT operacion (operacion, idTarea) VALUES
('Crear formulario', 4), ('Validar campos', 4), ('Conectar con API', 4),
('Diseñar wireframes', 5), ('Crear prototipo', 5);

-- 2. Datos para la tabla operacion
insert operacion (operacion, descripcion, idTarea) values
-- Operaciones para Tarea 1 (Configuración del Entorno Frontend)
('Instalar Node.js y dependencias iniciales', 'Instalar la versión LTS de Node y herramientas de empaquetado como Vite.', 1),
('Configurar Tailwind CSS en el proyecto', 'Inicializar el archivo de configuración y añadir las directivas en el CSS global.', 1),

-- Operaciones para Tarea 2 (Maquetación de la Interfaz de Usuario)
('Construir el Layout principal de navegación', 'Crear la barra lateral (Sidebar) y el menú superior adaptables.', 2),
('Implementar componentes dinámicos', 'Crear modales y tablas utilizando componentes reutilizables como shadcn/ui o similares.', 2),
('Validar formularios del lado del cliente', 'Añadir validaciones nativas o con librerías a los inputs del formulario.', 2),

-- Operaciones para Tarea 3 (Integración con APIs y Backend)
('Configurar cliente Axios o Fetch', 'Crear la instancia centralizada para el manejo de las peticiones HTTP.', 3),
('Gestionar el estado global de la autenticación', 'Controlar el flujo del Token de acceso (JWT) al iniciar sesión.', 3),

-- Operaciones para Tarea 4 (Modelado Entidad-Relación)
('Diseñar el diagrama de tablas (Script SQL)', 'Definir llaves primarias, foráneas y restricciones de integridad.', 4),
('Normalizar la base de datos a 3FN', 'Evitar la redundancia de información separando entidades correctamente.', 4),

-- Operaciones para Tarea 5 (Implementación de Programación en BD)
('Escribir procedimientos almacenados complejos', 'Crear SPs para inserciones masivas o lógica transaccional.', 5),
('Configurar Triggers de auditoría', 'Programar disparadores para registrar cambios en las tablas críticas de historial.', 5),

-- Operaciones para Tarea 6 (Diseño de Arquitectura de Software)
('Definir la arquitectura MVC', 'Organizar el proyecto en capas de Modelo, Vista y Controlador para separar responsabilidades.', 6),
('Implementar patrones de diseño', 'Aplicar patrones como Singleton, Factory o Repository para mejorar la mantenibilidad del código.', 6),
('Configurar herramientas de documentación', 'Utilizar Swagger o JSDoc para documentar la API y el código fuente.', 6),
('Establecer un pipeline de CI/CD', 'Configurar GitHub Actions o Jenkins para automatizar pruebas y despliegues.', 6);

-- Creando PEA
insert pea (id, year, estado, idcarrera) values (1, '2026', true, 1);

-- Datos para la tabla malla_curricular
-- vinculamos los cursos al pea id 1 en sus respectivos ciclos
insert malla_curricular ( idpea, idcurso, ciclo) values 
( 1, 1, 'V'), -- curso de programación web
( 1, 2, 'IV'), -- curso de base de datos
( 1, 5, 'IV'), -- ingeniería de software
( 1, 6, 'III'), -- diseño de interfaces
( 1, 20, 'III'); -- desarrollo de software I

-- Datos prueba para probar el Dashboard


-- Insertar usuarios instructores para probar los comentarios
INSERT usuario (nombres, apellidos, documento_identidad, correo_personal, password, telefono, idrol) VALUES
('Carlos', 'Rodríguez', '45678901', 'carlos.rodriguez@senati.pe', '123456', '987111222', 3),
('Ana', 'Flores', '45678902', 'ana.flores@senati.pe', '123456', '987333444', 3);

-- Registrar en la tabla de instructores para vincularlos con los cursos
INSERT instructor_seguimiento (idUsuario, zona_asignada) VALUES
(1, 'Zona A'), -- Carlos Rodríguez como instructor del curso de programación web
(2, 'Zona B'); -- Ana Flores como instructora del curso de base de datos

-- Nuevas visitas de seguimiento para el aprendiz (id=1)
INSERT visita_seguimiento (idAprendiz, idSeguimiento, fecha_visita, nota, estado) VALUES
(1, 1, '2025-05-15', 20, 'Aprobado'),
(1, 1, '2025-05-10', 13, 'Bajo'),
(1, 1, '2025-05-03', 19, 'Aprobado'),
(1, 1, '2025-04-26', 17, 'Aprobado'),
(1, 1, '2025-04-19', 11, 'Bajo');

-- Registrar progreso para el aprendiz (id=1)
INSERT progreso_operacion (idAprendiz, idOperacion, estado) VALUES
(1, 7, 'realizado'),
(1, 8, 'realizado'),
(1, 9, 'pendiente'),
(1, 10, 'realizado'),
(1, 11, 'pendiente');

-- Además marcar una operación pendiente anterior como realizada
UPDATE progreso_operacion SET estado = 'realizado' WHERE idAprendiz = 1 AND idOperacion = 3;

-- Insertar comentarios con los instructores correctos
INSERT comentario_avance (idAprendiz, idInstructor, nota, contenido, fecha) VALUES
(1, 2, 18.5, 'Excelente avance en el módulo de programación web, sigue así.', 20, '2025-05-08'),
(1, 3, 16.0, 'Buen desempeño, pero debe mejorar la puntualidad en entregas.', 16, '2025-05-01'),
(1, 2, 14.75, 'Avance regular, se recomienda repasar los temas de base de datos.', 14, '2025-04-24');
