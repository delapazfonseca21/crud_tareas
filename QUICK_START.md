# 🚀 Guía de Inicio Rápido

Esta guía te ayudará a poner en marcha el proyecto en menos de 5 minutos.

## ⚡ Inicio Rápido (TL;DR)

```bash
# 1. Clonar repositorio
git clone git@github.com:delapazfonseca21/crud_tareas.git
cd crud_tareas

# 2. Levantar PostgreSQL con Docker
docker run --name postgres-tasks \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=tasks_db \
  -p 5432:5432 \
  -d postgres:14-alpine

# 3. Backend
cd backend
cp .env.example .env
# Editar .env (las credenciales por defecto ya funcionan con Docker)
npm install
npm run start:dev

# 4. Frontend (en otra terminal)
cd frontend
cp .env.example .env
npm install
npm run dev
```

## 📋 Prerequisitos

Asegúrate de tener instalado:

- ✅ Node.js >= 18.x
- ✅ npm >= 9.x
- ✅ Docker
- ✅ Git

### Verificar versiones

```bash
node --version    # Debe ser >= 18
npm --version     # Debe ser >= 9
docker --version  # Debe estar instalado
```

## 🗄️ Configurar Base de Datos con Docker

### Opción 1: Docker (Recomendada)

Levantar PostgreSQL en un contenedor Docker:

```bash
# Levantar PostgreSQL
docker run --name postgres-tasks \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=tasks_db \
  -p 5432:5432 \
  -d postgres:14-alpine

# Ver logs
docker logs -f postgres-tasks

# Verificar que está corriendo
docker ps | grep postgres-tasks

# Detener
docker stop postgres-tasks

# Iniciar nuevamente
docker start postgres-tasks

# Eliminar contenedor (y sus datos)
docker rm -f postgres-tasks
```

**Credenciales por defecto** (ya configuradas en `backend/.env.example`):
- Host: `localhost`
- Port: `5432`
- Usuario: `postgres`
- Password: `postgres`
- Database: `tasks_db`

### Opción 2: PostgreSQL Local

Si ya tienes PostgreSQL instalado:

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE tasks_db;

# Salir
\q
```

## 🔧 Configuración Detallada

### Backend

1. **Navegar a la carpeta backend**
   ```bash
   cd backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```

4. **Editar `.env` con tus credenciales**
   
   Si usas Docker Compose, las credenciales por defecto ya funcionan:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=tasks_db
   
   PORT=3000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

5. **Iniciar servidor de desarrollo**
   ```bash
   npm run start:dev
   ```

6. **Verificar que funciona**
   - API: http://localhost:3000
   - Swagger: http://localhost:3000/api

### Frontend

1. **Abrir nueva terminal y navegar a frontend**
   ```bash
   cd frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```

4. **Editar `.env`**
   ```env
   VITE_API_URL=http://localhost:3000
   ```

5. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador**
   - Frontend: http://localhost:5173

## ✅ Verificación

### Backend funcionando

```bash
# Probar endpoint de health
curl http://localhost:3000/tasks

# Debería devolver: []
```

### Frontend funcionando

1. Abre http://localhost:5173
2. Deberías ver la interfaz del gestor de tareas
3. Intenta crear una tarea de prueba

## 🐛 Solución de Problemas Comunes

### Error: "Cannot connect to database"

**Problema**: El backend no puede conectarse a PostgreSQL

**Solución**:
1. Verifica que PostgreSQL está ejecutándose:
   ```bash
   sudo systemctl status postgresql
   # o
   docker ps | grep postgres
   ```

2. Verifica las credenciales en `backend/.env`

3. Verifica que la base de datos existe:
   ```bash
   psql -U postgres -l | grep tasks_db
   ```

### Error: "Port 3000 already in use"

**Problema**: El puerto 3000 está ocupado

**Solución**:
1. Cambia el puerto en `backend/.env`:
   ```env
   PORT=3001
   ```

2. Actualiza `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

### Error: "CORS policy"

**Problema**: El frontend no puede hacer peticiones al backend

**Solución**:
1. Verifica que `CORS_ORIGIN` en `backend/.env` coincide con la URL del frontend
2. Reinicia el servidor backend

### Error: "Module not found"

**Problema**: Faltan dependencias

**Solución**:
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📚 Próximos Pasos

Una vez que todo esté funcionando:

1. **Explora la API con Swagger**
   - http://localhost:3000/api
   - Prueba los endpoints interactivamente

2. **Crea algunas tareas de prueba**
   - Usa el frontend para crear tareas
   - Prueba los filtros por estado y prioridad

3. **Revisa el código**
   - Backend: `backend/src/tasks/`
   - Frontend: `frontend/src/components/`

4. **Lee la documentación**
   - `README.md` - Documentación general
   - `backend/README.md` - Detalles del backend
   - `frontend/README.md` - Detalles del frontend
   - `IMPLEMENTATION.md` - Decisiones técnicas

## 🎯 Comandos Útiles

### Backend

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Linting
npm run lint

# Formateo
npm run format

# Tests
npm run test
npm run test:e2e
npm run test:cov
```

### Frontend

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 📞 ¿Necesitas Ayuda?

Si encuentras algún problema:

1. Revisa la sección de **Solución de Problemas** arriba
2. Consulta los README específicos en `backend/` y `frontend/`
3. Revisa los logs de la consola para errores específicos

## 🎉 ¡Listo!

Si llegaste hasta aquí y todo funciona, ¡felicidades! 🎊

Ahora puedes:
- Explorar el código
- Hacer modificaciones
- Agregar nuevas features
- Ejecutar tests

---

**¿Preguntas?** Contacta al desarrollador o revisa la documentación completa en `README.md`
