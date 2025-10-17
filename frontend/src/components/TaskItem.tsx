import { Task, TaskStatusLabels, TaskPriorityLabels } from '../types/task.types';

/**
 * Props del componente TaskItem
 */
interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

/**
 * Componente que muestra una tarea individual en formato card
 * 
 * Muestra todos los detalles de la tarea y proporciona
 * botones para editar y eliminar.
 */
export function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  /**
   * Formatea una fecha ISO a formato legible
   */
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  /**
   * Maneja la confirmación antes de eliminar
   */
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{task.title}</h3>
          
          {/* Badges de estado y prioridad */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className={`badge badge-${task.status.replace('_', '-')}`}>
              {TaskStatusLabels[task.status]}
            </span>
            <span className={`badge badge-${task.priority}`}>
              {TaskPriorityLabels[task.priority]}
            </span>
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onEdit(task)}
            title="Editar tarea"
          >
            ✏️ Editar
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={handleDelete}
            title="Eliminar tarea"
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>

      {/* Descripción */}
      {task.description && (
        <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>
          {task.description}
        </p>
      )}

      {/* Información adicional */}
      <div style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        fontSize: '0.875rem', 
        color: 'var(--gray-600)',
        borderTop: '1px solid var(--gray-200)',
        paddingTop: '1rem'
      }}>
        {task.dueDate && (
          <div>
            <strong>Vencimiento:</strong> {formatDate(task.dueDate)}
          </div>
        )}
        <div>
          <strong>Creada:</strong> {formatDate(task.createdAt)}
        </div>
      </div>
    </div>
  );
}
