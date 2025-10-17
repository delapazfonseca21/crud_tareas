# Backend - API REST con NestJS

## 📋 Descripción

API REST desarrollada con NestJS para gestionar tareas (CRUD completo). Implementa validaciones robustas, documentación Swagger y arquitectura modular.

## 🏗️ Arquitectura

El backend sigue la arquitectura modular de NestJS con separación clara de responsabilidades:

```
src/
├── tasks/                    # Módulo de tareas
│   ├── entities/            # Entidades TypeORM
│   ├── dto/                 # Data Transfer Objects
│   ├── enums/               # Enumeraciones
│   ├── tasks.controller.ts  # Controlador REST
│   ├── tasks.service.ts     # Lógica de negocio
│   └── tasks.module.ts      # Módulo de tareas
├── common/                   # Recursos compartidos
│   └── filters/             # Filtros de excepciones
├── app.module.ts            # Módulo raíz
└── main.ts                  # Punto de entrada
```

## 🚀 Tecnologías

- **NestJS 10** - Framework progresivo de Node.js
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos relacional
- **Swagger** - Documentación automática de API
- **Class Validator** - Validación de DTOs
- **TypeScript** - Tipado estático

## 📦 Instalación

### Requisitos previos

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm >= 9.x

### Pasos de instalación

1. **Instalar dependencias**

```bash
npm install
```

2. **Configurar variables de entorno**

Crear archivo `.env` basado en `.env.example`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=tasks_db

PORT=3000
NODE_ENV=development

CORS_ORIGIN=http://localhost:5173
```

3. **Crear base de datos**

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE tasks_db;
```

4. **Ejecutar el servidor**

```bash
# Modo desarrollo (con hot-reload)
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

El servidor estará disponible en: `http://localhost:3000`

## 📚 Documentación API (Swagger)

Una vez iniciado el servidor, accede a la documentación interactiva:

**URL**: `http://localhost:3000/api`

Swagger proporciona:
- Listado completo de endpoints
- Esquemas de datos
- Ejemplos de peticiones/respuestas
- Pruebas interactivas

## 🔌 Endpoints

### Tareas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/tasks` | Listar todas las tareas |
| `GET` | `/tasks?status=todo` | Filtrar por estado |
| `GET` | `/tasks?priority=high` | Filtrar por prioridad |
| `GET` | `/tasks/:id` | Obtener tarea por ID |
| `POST` | `/tasks` | Crear nueva tarea |
| `PATCH` | `/tasks/:id` | Actualizar tarea |
| `DELETE` | `/tasks/:id` | Eliminar tarea |

### Ejemplos de uso

#### Crear tarea

```bash
POST /tasks
Content-Type: application/json

{
  "title": "Implementar autenticación",
  "description": "Agregar JWT y guards",
  "status": "todo",
  "priority": "high",
  "dueDate": "2025-10-20T00:00:00.000Z"
}
```

#### Actualizar tarea

```bash
PATCH /tasks/123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json

{
  "status": "in_progress"
}
```

## 📊 Modelo de Datos

### Entidad Task

```typescript
{
  id: string;              // UUID generado automáticamente
  title: string;           // 1-100 caracteres, obligatorio
  description?: string;    // 0-500 caracteres, opcional
  status: TaskStatus;      // 'todo' | 'in_progress' | 'done'
  priority: TaskPriority;  // 'low' | 'medium' | 'high'
  dueDate?: Date;          // Fecha de vencimiento, opcional
  createdAt: Date;         // Generado automáticamente
  updatedAt: Date;         // Actualizado automáticamente
}
```

## ✅ Validaciones

### CreateTaskDto

- `title`: Requerido, string, 1-100 caracteres
- `description`: Opcional, string, máximo 500 caracteres
- `status`: Opcional, enum ['todo', 'in_progress', 'done'], default: 'todo'
- `priority`: Opcional, enum ['low', 'medium', 'high'], default: 'medium'
- `dueDate`: Opcional, fecha ISO válida

### UpdateTaskDto

Todos los campos son opcionales (Partial de CreateTaskDto)

## 🧪 Pruebas

```bash
# Tests unitarios
npm run test

# Tests con cobertura
npm run test:cov

# Tests end-to-end
npm run test:e2e

# Tests en modo watch
npm run test:watch
```

## 🛠️ Scripts disponibles

```bash
npm run start:dev    # Desarrollo con hot-reload
npm run start:prod   # Producción
npm run build        # Compilar proyecto
npm run lint         # Ejecutar linter
npm run format       # Formatear código con Prettier
npm run test         # Ejecutar tests
```

## 🔒 Manejo de Errores

El backend implementa un sistema robusto de manejo de errores:

### Códigos de respuesta

- `200` - OK
- `201` - Created
- `400` - Bad Request (validación fallida)
- `404` - Not Found (recurso no encontrado)
- `500` - Internal Server Error

### Formato de error

```json
{
  "statusCode": 400,
  "message": ["title must be longer than or equal to 1 characters"],
  "error": "Bad Request"
}
```

## 🏛️ Estructura de Módulos

### TasksModule

Módulo principal que encapsula toda la funcionalidad de tareas:

- **Entity**: Define el esquema de base de datos
- **DTOs**: Validan datos de entrada
- **Service**: Contiene la lógica de negocio
- **Controller**: Maneja las peticiones HTTP

### AppModule

Módulo raíz que configura:
- TypeORM con PostgreSQL
- Variables de entorno
- CORS
- Validación global

## 🎯 Buenas Prácticas Implementadas

1. ✅ **Arquitectura modular** - Separación por features
2. ✅ **DTOs con validaciones** - Validación robusta de datos
3. ✅ **Manejo de excepciones** - Errores controlados y descriptivos
4. ✅ **Documentación Swagger** - API autodocumentada
5. ✅ **TypeScript estricto** - Tipado fuerte en todo el código
6. ✅ **Variables de entorno** - Configuración externalizada
7. ✅ **Código limpio** - Comentarios y nombres descriptivos

## 📝 Notas de Desarrollo

### TypeORM

El proyecto usa TypeORM con sincronización automática en desarrollo:

```typescript
synchronize: process.env.NODE_ENV === 'development'
```

⚠️ **Importante**: En producción, usar migraciones en lugar de `synchronize: true`

### CORS

CORS está habilitado para permitir peticiones desde el frontend:

```typescript
app.enableCors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
});
```

## 🐛 Troubleshooting

### Error de conexión a base de datos

Verificar:
1. PostgreSQL está ejecutándose
2. Credenciales en `.env` son correctas
3. Base de datos existe

### Puerto en uso

Si el puerto 3000 está ocupado, cambiar `PORT` en `.env`

---

**Desarrollado como parte de la prueba técnica para Novacore**
