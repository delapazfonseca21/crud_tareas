import { Task } from '../types/task.types';
import { TaskItem } from './TaskItem';

/**
 * Props del componente TaskList
 */
interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

/**
 * Componente que muestra la lista de tareas
 * 
 * Renderiza cada tarea usando el componente TaskItem
 * y maneja el estado vacío cuando no hay tareas.
 */
export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  // Estado vacío
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--gray-700)' }}>
          No hay tareas
        </h3>
        <p style={{ color: 'var(--gray-600)' }}>
          Comienza creando una nueva tarea
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <p style={{ color: 'var(--gray-600)' }}>
          {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
        </p>
      </div>

      {/* Lista de tareas */}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
