# CRUD de Tareas - NestJS + React + TypeScript

## 📋 Descripción

Sistema completo de gestión de tareas (CRUD) desarrollado como prueba técnica para **Novacore**. El proyecto consta de un backend robusto en NestJS y un frontend moderno en React, ambos implementados con TypeScript.

## 🏗️ Arquitectura del Proyecto

```
crud_tareas/
├── backend/          # API REST con NestJS
├── frontend/         # Aplicación React con TypeScript
└── README.md         # Este archivo
```

## 🚀 Tecnologías Utilizadas

### Backend
- **NestJS** - Framework progresivo de Node.js
- **TypeScript** - Tipado estático
- **TypeORM** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional
- **Swagger** - Documentación de API
- **Class Validator** - Validación de DTOs

### Frontend
- **React 18** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **TanStack Query** - Gestión de estado del servidor
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Tailwind CSS** - Estilos utility-first

## 📦 Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Docker**
- **Git**

## 🔧 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone git@github.com:delapazfonseca21/crud_tareas.git
cd crud_tareas
```

### 2. Levantar Base de Datos con Docker

```bash
# Levantar PostgreSQL con Docker
docker run --name postgres-tasks \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=tasks_db \
  -p 5432:5432 \
  -d postgres:14-alpine

# Verificar que está corriendo
docker ps | grep postgres-tasks
```

### 3. Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend/`:

```env
# Database (credenciales por defecto de Docker)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=tasks_db

# Application
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Levantar el servidor:

```bash
npm run start:dev
```

El backend estará disponible en: `http://localhost:3000`
Documentación Swagger: `http://localhost:3000/api`

### 4. Configurar Frontend

```bash
cd frontend
npm install
```

Crear archivo `.env` en la carpeta `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 📊 Modelo de Datos

### Entidad Task

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Identificador único generado automáticamente |
| `title` | string | Título de la tarea (1-100 caracteres) |
| `description` | string | Descripción detallada (0-500 caracteres) |
| `status` | enum | Estado: `todo`, `in_progress`, `done` |
| `priority` | enum | Prioridad: `low`, `medium`, `high` |
| `dueDate` | Date | Fecha de vencimiento (opcional) |
| `createdAt` | DateTime | Fecha de creación (auto) |
| `updatedAt` | DateTime | Fecha de actualización (auto) |

## 🔌 API Endpoints

### Tareas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/tasks` | Listar todas las tareas (con filtros opcionales) |
| `GET` | `/tasks/:id` | Obtener una tarea por ID |
| `POST` | `/tasks` | Crear una nueva tarea |
| `PATCH` | `/tasks/:id` | Actualizar una tarea existente |
| `DELETE` | `/tasks/:id` | Eliminar una tarea |

### Filtros disponibles en GET /tasks

- `status`: Filtrar por estado (`todo`, `in_progress`, `done`)
- `priority`: Filtrar por prioridad (`low`, `medium`, `high`)

Ejemplo: `GET /tasks?status=in_progress&priority=high`

## 🧪 Pruebas

### Backend

```bash
cd backend
npm run test          # Tests unitarios
npm run test:e2e      # Tests end-to-end
npm run test:cov      # Cobertura de tests
```

### Frontend

```bash
cd frontend
npm run test          # Tests con Vitest
```

## 📝 Scripts Disponibles

### Backend

- `npm run start:dev` - Modo desarrollo con hot-reload
- `npm run start:prod` - Modo producción
- `npm run build` - Compilar proyecto
- `npm run lint` - Ejecutar linter
- `npm run format` - Formatear código

### Frontend

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Ejecutar linter

## 🏛️ Estructura del Proyecto

### Backend

```
backend/src/
├── tasks/
│   ├── entities/
│   │   └── task.entity.ts       # Entidad TypeORM
│   ├── dto/
│   │   ├── create-task.dto.ts   # DTO para crear
│   │   ├── update-task.dto.ts   # DTO para actualizar
│   │   └── filter-task.dto.ts   # DTO para filtros
│   ├── enums/
│   │   ├── task-status.enum.ts  # Enum de estados
│   │   └── task-priority.enum.ts # Enum de prioridades
│   ├── tasks.controller.ts      # Controlador REST
│   ├── tasks.service.ts         # Lógica de negocio
│   └── tasks.module.ts          # Módulo de tareas
├── common/
│   └── filters/
│       └── http-exception.filter.ts # Filtro de excepciones
├── app.module.ts                # Módulo principal
└── main.ts                      # Punto de entrada
```

### Frontend

```
frontend/src/
├── components/
│   ├── TaskList.tsx             # Lista de tareas
│   ├── TaskForm.tsx             # Formulario crear/editar
│   ├── TaskItem.tsx             # Card de tarea individual
│   └── TaskFilters.tsx          # Filtros de búsqueda
├── services/
│   └── taskService.ts           # Cliente API
├── types/
│   └── task.types.ts            # Tipos TypeScript
├── hooks/
│   └── useTasks.ts              # Hook personalizado
├── App.tsx                      # Componente principal
└── main.tsx                     # Punto de entrada
```

## ✨ Características Implementadas

- ✅ CRUD completo de tareas
- ✅ Validaciones en backend y frontend
- ✅ Filtros por estado y prioridad
- ✅ Manejo de errores robusto
- ✅ Documentación Swagger
- ✅ Interfaz responsive
- ✅ Feedback visual (loading, errores, éxito)
- ✅ Código limpio y bien documentado
- ✅ TypeScript en todo el stack

## 🎯 Buenas Prácticas Implementadas

1. **Arquitectura modular** - Separación clara de responsabilidades
2. **DTOs y validaciones** - Validación de datos en ambos lados
3. **Manejo de errores** - Excepciones controladas y mensajes claros
4. **Tipado fuerte** - TypeScript en todo el proyecto
5. **Código autodocumentado** - Comentarios descriptivos
6. **Convenciones de código** - ESLint y Prettier configurados
7. **Git workflow** - Commits organizados por features

## 👨‍💻 Autor

**Desarrollador**: [Tu Nombre]

**Prueba Técnica para**: Novacore
- Email: contacto@novacore.com.co
- WhatsApp: +57 314 400 0253

## 📄 Licencia

Este proyecto fue desarrollado como prueba técnica.

---

**Nota**: Para más detalles sobre cada parte del proyecto, consulta los README específicos en las carpetas `backend/` y `frontend/`.
