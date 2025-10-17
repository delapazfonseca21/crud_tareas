import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { useTasks } from './hooks/useTasks';
import { Task, TaskStatus, TaskPriority } from './types/task.types';
import './styles/App.css';

// Crear cliente de TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * Componente principal de la aplicación
 * Gestiona el estado de la UI y coordina los componentes
 */
function TasksApp() {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: TaskPriority;
  }>({});

  // Hook personalizado para gestionar tareas
  const {
    tasks,
    isLoading,
    isError,
    error,
    createTask,
    updateTask,
    deleteTask,
    isCreating,
    isUpdating,
  } = useTasks(filters);

  /**
   * Maneja la creación o actualización de una tarea
   */
  const handleSubmit = async (data: any) => {
    try {
      if (editingTask) {
        await updateTask({ id: editingTask.id, data });
      } else {
        await createTask(data);
      }
      setShowForm(false);
      setEditingTask(undefined);
    } catch (err) {
      console.error('Error al guardar tarea:', err);
      alert('Error al guardar la tarea. Por favor, intenta de nuevo.');
    }
  };

  /**
   * Maneja la edición de una tarea
   */
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  /**
   * Maneja la eliminación de una tarea
   */
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (err) {
      console.error('Error al eliminar tarea:', err);
      alert('Error al eliminar la tarea. Por favor, intenta de nuevo.');
    }
  };

  /**
   * Cancela el formulario y resetea el estado
   */
  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  /**
   * Maneja el cambio de filtro de estado
   */
  const handleStatusChange = (status?: TaskStatus) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  /**
   * Maneja el cambio de filtro de prioridad
   */
  const handlePriorityChange = (priority?: TaskPriority) => {
    setFilters((prev) => ({ ...prev, priority }));
  };

  /**
   * Limpia todos los filtros
   */
  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>📋 Gestor de Tareas</h1>
        <p>Organiza y gestiona tus tareas de manera eficiente</p>
      </header>

      {/* Botón para crear nueva tarea */}
      {!showForm && (
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            ➕ Nueva Tarea
          </button>
        </div>
      )}

      {/* Formulario de crear/editar */}
      {showForm && (
        <div style={{ marginBottom: '2rem' }}>
          <TaskForm
            task={editingTask}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isCreating || isUpdating}
          />
        </div>
      )}

      {/* Filtros */}
      {!showForm && (
        <TaskFilters
          status={filters.status}
          priority={filters.priority}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onClearFilters={handleClearFilters}
        />
      )}

      {/* Estados de carga y error */}
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando tareas...</p>
        </div>
      )}

      {isError && (
        <div className="error">
          <strong>Error al cargar las tareas:</strong>{' '}
          {error instanceof Error ? error.message : 'Error desconocido'}
        </div>
      )}

      {/* Lista de tareas */}
      {!isLoading && !isError && (
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        marginTop: '3rem', 
        paddingTop: '2rem',
        borderTop: '1px solid var(--gray-200)',
        color: 'var(--gray-600)',
        fontSize: '0.875rem'
      }}>
        <p>Desarrollado para Novacore - Prueba Técnica</p>
      </footer>
    </div>
  );
}

/**
 * Componente raíz que envuelve la app con el QueryClientProvider
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TasksApp />
    </QueryClientProvider>
  );
}
