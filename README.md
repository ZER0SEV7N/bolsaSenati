# 🎓 Bolsa de Trabajo SENATI - Módulo "Aprendiz"

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Node.js / Framework](https://img.shields.io/badge/backend-framework-blue?style=for-the-badge) ![Database](https://img.shields.io/badge/database-SQL-lightgrey?style=for-the-badge)

Este repositorio contiene la implementación técnica del **Módulo "Aprendiz"** para el sistema de Bolsa de Trabajo. Este proyecto es una contribución directa para la tesis académica de un docente de la institución, enfocada en optimizar la plataforma de empleabilidad estudiantil.

## 🎯 Objetivo y Alcance del Proyecto
El desarrollo de este repositorio está estrictamente delimitado a la creación de la API y la mejora de la interfaz de usuario **únicamente para el rol de Aprendiz**. 

Nuestra responsabilidad como equipo integrador consistió en:
1. **Desarrollo Backend:** Construir las rutas, controladores y servicios necesarios para gestionar los datos del perfil del aprendiz, postulaciones y visualización de ofertas.
2. **Mejora del Frontend:** Refactorizar y optimizar las vistas asignadas a este módulo, asegurando una experiencia de usuario ágil y conectando la interfaz con los nuevos endpoints de la API.

*(Nota: Los módulos de Empresas, Administradores u otros roles externos al "Aprendiz" no forman parte del alcance de esta integración específica).*

## 🏗️ Estructura del Monorepo
Para mantener el orden en un entorno de desarrollo unificado, el código fuente aloja tanto el cliente como el servidor en el mismo repositorio, divididos en dos directorios principales:

```text
📦 bolsaSenati
├── 📂 frontend/               # Aplicación cliente (Interfaz de Usuario)
│   ├── 📂 src/
│   │   ├── 📂 components/     # Componentes UI reutilizables
│   │   ├── 📂 views/          # Vistas exclusivas del módulo Aprendiz
│   │   ├── 📂 services/       # Lógica de consumo de la API REST
│   │   └── ...
│   └── package.json
│
├── 📂 backend/                # Servidor y API RESTful
│   ├── 📂 controllers/        # Controladores de rutas del aprendiz
│   ├── 📂 models/             # Esquemas y entidades de la base de datos
│   ├── 📂 routes/             # Definición de endpoints
│   └── ...
│
└── 📜 README.md
```
## 🤝 Metodología de Trabajo y Ramas (Branching)
El flujo de colaboración se diseñó para permitir el trabajo en paralelo de los distintos integrantes del equipo sin generar conflictos en el monorepo.
- 🌿 master / main: Rama de integración final. Contiene el código estable y funcional del módulo completo, listo para ser acoplado al proyecto principal de la tesis.
-👨‍💻 Ramas Personales: Cada integrante del equipo desarrolló sus asignaciones en una rama aislada que lleva su nombre (ej. daniel-dev, integrante2-dev).
Cada desarrollador fue responsable de construir tanto la porción del Frontend como del Backend de su requerimiento específico dentro de su rama, antes de fusionarlo a la rama principal mediante Pull Requests.

## 🚀 Requisitos e Instalación Local
Para ejecutar ambos entornos de manera local:

1. Clonar el repositorio:

```bash
git clone [https://github.com/ZER0SEV7N/bolsaSenati.git](https://github.com/ZER0SEV7N/bolsaSenati.git)
```
2. Levantar el Backend:

```bash
cd backend
npm install   # o el gestor de paquetes correspondiente
# Configurar variables de entorno (.env) para la base de datos local
npm run dev
```
3. Levantar el Frontend:
Abre una nueva terminal en la raíz del proyecto.

```bash
cd frontend
npm install
npm run dev
```

---

### 💡 Tips para este repositorio:
* En la sección de insignias (la segunda línea del código), asegúrate de cambiar `Backend Framework` y `Database` por la tecnología exacta que les pidió el profesor (por ejemplo, PHP/Laravel, Node/Express, MySQL, etc.).
* Este `README` es brillante estratégicamente porque **protege tu imagen**. Si un reclutador ve
