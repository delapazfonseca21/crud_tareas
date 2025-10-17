# Frontend - React + TypeScript

## 📋 Descripción

Aplicación frontend desarrollada con React y TypeScript para gestionar tareas. Implementa un CRUD completo con validaciones, gestión de estado con TanStack Query y una interfaz de usuario moderna.

## 🏗️ Arquitectura

```
src/
├── components/          # Componentes React
│   ├── TaskList.tsx    # Lista de tareas con filtros
│   ├── TaskForm.tsx    # Formulario crear/editar
│   ├── TaskItem.tsx    # Card de tarea individual
│   └── TaskFilters.tsx # Filtros de búsqueda
├── services/           # Servicios API
│   └── taskService.ts  # Cliente HTTP con axios
├── types/              # Tipos TypeScript
│   └── task.types.ts   # Interfaces y tipos
├── hooks/              # Hooks personalizados
│   └── useTasks.ts     # Hook para gestión de tareas
├── styles/             # Estilos CSS
│   └── App.css         # Estilos globales
├── App.tsx             # Componente principal
└── main.tsx            # Punto de entrada
```

## 🚀 Tecnologías

- **React 18** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **TanStack Query** - Gestión de estado del servidor
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Axios** - Cliente HTTP

## 📦 Instalación

### Requisitos previos

- Node.js >= 18.x
- npm >= 9.x
- Backend ejecutándose en `http://localhost:3000`

### Pasos de instalación

1. **Instalar dependencias**

```bash
npm install
```

2. **Configurar variables de entorno**

Crear archivo `.env` basado en `.env.example`:

```env
VITE_API_URL=http://localhost:3000
```

3. **Ejecutar el servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

## 🎨 Características

### Gestión de Tareas

- ✅ **Listar tareas** - Ver todas las tareas con paginación
- ✅ **Crear tarea** - Formulario con validaciones
- ✅ **Editar tarea** - Actualización parcial de campos
- ✅ **Eliminar tarea** - Con confirmación
- ✅ **Filtrar tareas** - Por estado y prioridad

### Validaciones

Todas las validaciones se realizan con Zod y React Hook Form:

- **Título**: 1-100 caracteres, obligatorio
- **Descripción**: 0-500 caracteres, opcional
- **Estado**: Enum validado (todo, in_progress, done)
- **Prioridad**: Enum validado (low, medium, high)
- **Fecha**: Formato ISO válido, opcional

### Feedback Visual

- Loading states durante peticiones
- Mensajes de éxito/error
- Validaciones en tiempo real
- Confirmaciones para acciones destructivas

## 🔌 Integración con Backend

El frontend se comunica con el backend mediante axios:

```typescript
// Configuración base
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Ejemplo de petición
const tasks = await axios.get(`${API_URL}/tasks`);
```

### Endpoints utilizados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/tasks` | Listar tareas |
| `GET` | `/tasks?status=todo` | Filtrar por estado |
| `GET` | `/tasks/:id` | Obtener tarea |
| `POST` | `/tasks` | Crear tarea |
| `PATCH` | `/tasks/:id` | Actualizar tarea |
| `DELETE` | `/tasks/:id` | Eliminar tarea |

## 📊 Gestión de Estado

### TanStack Query

Se utiliza TanStack Query (React Query) para:

- Cache automático de datos
- Sincronización con el servidor
- Revalidación en background
- Optimistic updates
- Manejo de loading/error states

```typescript
// Hook personalizado
const { data: tasks, isLoading, error } = useTasks();
```

## 🧪 Estructura de Componentes

### TaskList

Componente principal que muestra la lista de tareas:
- Integra filtros
- Muestra loading/error states
- Renderiza TaskItem para cada tarea

### TaskForm

Formulario reutilizable para crear/editar:
- Validaciones con Zod
- React Hook Form para gestión
- Modo crear/editar dinámico

### TaskItem

Card individual de tarea:
- Muestra todos los campos
- Botones de acción (editar/eliminar)
- Badges para estado y prioridad

### TaskFilters

Filtros de búsqueda:
- Select para estado
- Select para prioridad
- Botón para limpiar filtros

## 🛠️ Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Preview del build
npm run lint      # Ejecutar linter
```

## 🎯 Buenas Prácticas Implementadas

1. ✅ **Componentes funcionales** - Hooks en lugar de clases
2. ✅ **TypeScript estricto** - Tipos en todo el código
3. ✅ **Validaciones robustas** - Zod + React Hook Form
4. ✅ **Gestión de estado** - TanStack Query
5. ✅ **Código limpio** - Componentes pequeños y reutilizables
6. ✅ **Manejo de errores** - Error boundaries y feedback
7. ✅ **Accesibilidad** - Semántica HTML correcta

## 🔒 Manejo de Errores

### Errores de red

```typescript
if (error) {
  return <div>Error al cargar tareas: {error.message}</div>;
}
```

### Validaciones de formulario

```typescript
{errors.title && (
  <span className="error">{errors.title.message}</span>
)}
```

## 🐛 Troubleshooting

### Error de conexión con backend

Verificar:
1. Backend está ejecutándose en el puerto correcto
2. Variable `VITE_API_URL` está configurada
3. CORS está habilitado en el backend

### Errores de build

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 📝 Notas de Desarrollo

### Variables de entorno

Las variables de entorno en Vite deben tener el prefijo `VITE_`:

```env
VITE_API_URL=http://localhost:3000
```

Acceso en código:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

### Hot Module Replacement (HMR)

Vite proporciona HMR automático. Los cambios se reflejan instantáneamente sin recargar la página.

---

**Desarrollado como parte de la prueba técnica para Novacore**
