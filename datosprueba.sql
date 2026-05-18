-- Datos de prueba para la base de datos de la bolsa de trabajo del SENATI
use bolsaSenati;


-- Datos para la tabla tarea
insert into tarea (id, tarea, descripcion, idCurso) values
-- Tareas para el Curso 1: Programación Web
(1, 'Configuración del Entorno Frontend', 'Configurar el espacio de trabajo local para el desarrollo de la aplicación web.', 1),
(2, 'Maquetación de la Interfaz de Usuario', 'Crear la estructura y estilos del diseño web responsive.', 1),
(3, 'Integración con APIs y Backend', 'Consumir servicios REST para dinamizar la interfaz de usuario.', 1),

-- Tareas para el Curso 2: Base de Datos
(4, 'Modelado Entidad-Relación', 'Diseñar la estructura lógica y relacional de la base de datos.', 2),
(5, 'Implementación de Programación en BD', 'Crear la lógica programable directamente en el servidor MySQL.', 2);


-- 2. Datos para la tabla operacion
insert into operacion (id, operacion, descripcion, idTarea) values
-- Operaciones para Tarea 1 (Configuración del Entorno Frontend)
(null, 'Instalar Node.js y dependencias iniciales', 'Instalar la versión LTS de Node y herramientas de empaquetado como Vite.', 1),
(null, 'Configurar Tailwind CSS en el proyecto', 'Inicializar el archivo de configuración y añadir las directivas en el CSS global.', 1),

-- Operaciones para Tarea 2 (Maquetación de la Interfaz de Usuario)
(null, 'Construir el Layout principal de navegación', 'Crear la barra lateral (Sidebar) y el menú superior adaptables.', 2),
(null, 'Implementar componentes dinámicos', 'Crear modales y tablas utilizando componentes reutilizables como shadcn/ui o similares.', 2),
(null, 'Validar formularios del lado del cliente', 'Añadir validaciones nativas o con librerías a los inputs del formulario.', 2),

-- Operaciones para Tarea 3 (Integración con APIs y Backend)
(null, 'Configurar cliente Axios o Fetch', 'Crear la instancia centralizada para el manejo de las peticiones HTTP.', 3),
(null, 'Gestionar el estado global de la autenticación', 'Controlar el flujo del Token de acceso (JWT) al iniciar sesión.', 3),

-- Operaciones para Tarea 4 (Modelado Entidad-Relación)
(null, 'Diseñar el diagrama de tablas (Script SQL)', 'Definir llaves primarias, foráneas y restricciones de integridad.', 4),
(null, 'Normalizar la base de datos a 3FN', 'Evitar la redundancia de información separando entidades correctamente.', 4),

-- Operaciones para Tarea 5 (Implementación de Programación en BD)
(null, 'Escribir procedimientos almacenados complejos', 'Crear SPs para inserciones masivas o lógica transaccional.', 5),
(null, 'Configurar Triggers de auditoría', 'Programar disparadores para registrar cambios en las tablas críticas de historial.', 5);

-- Creando PEA
insert into pea (id, year, estado, idcarrera) values (1, '2026', true, 1);

-- Datos para la tabla malla_curricular
-- vinculamos los cursos al pea id 1 en sus respectivos ciclos
insert into malla_curricular (id, idpea, idcurso, ciclo) values 
(null, 1, 1, 'V'), -- curso de programación web
(null, 1, 2, 'IV'), -- curso de base de datos
(null, 1, 5, 'IV'), -- ingeniería de software
(null, 1, 6, 'III'), -- diseño de interfaces
(null, 1, 20, 'III'); -- desarrollo de software i
