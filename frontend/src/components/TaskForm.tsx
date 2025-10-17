import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Task, TaskStatus, TaskPriority, TaskStatusLabels, TaskPriorityLabels } from '../types/task.types';

/**
 * Schema de validación con Zod
 * Define las reglas de validación para el formulario
 */
const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es obligatorio')
    .max(100, 'El título no puede exceder 100 caracteres'),
  description: z
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional()
    .or(z.literal('')),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  dueDate: z
    .string()
    .optional()
    .or(z.literal('')),
});

type TaskFormData = z.infer<typeof taskSchema>;

/**
 * Props del componente TaskForm
 */
interface TaskFormProps {
  task?: Task;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

/**
 * Componente de formulario para crear/editar tareas
 * 
 * Utiliza React Hook Form para gestión del formulario
 * y Zod para validaciones. Soporta modo crear y editar.
 */
export function TaskForm({ task, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const isEditMode = !!task;

  // Configurar React Hook Form con validación Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description || '',
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        }
      : {
          title: '',
          description: '',
          status: TaskStatus.TODO,
          priority: TaskPriority.MEDIUM,
          dueDate: '',
        },
  });

  /**
   * Maneja el envío del formulario
   */
  const handleFormSubmit = (data: TaskFormData) => {
    // Convertir fecha a ISO string si existe
    const formattedData = {
      ...data,
      description: data.description || undefined,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
    };

    onSubmit(formattedData);
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
        {isEditMode ? 'Editar Tarea' : 'Nueva Tarea'}
      </h2>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Título */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Título <span style={{ color: 'var(--danger)' }}>*</span>
          </label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="Ej: Implementar autenticación JWT"
            {...register('title')}
          />
          {errors.title && (
            <p className="form-error">{errors.title.message}</p>
          )}
        </div>

        {/* Descripción */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Descripción
          </label>
          <textarea
            id="description"
            className="form-textarea"
            placeholder="Describe los detalles de la tarea..."
            {...register('description')}
          />
          {errors.description && (
            <p className="form-error">{errors.description.message}</p>
          )}
        </div>

        {/* Estado y Prioridad en fila */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {/* Estado */}
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Estado
            </label>
            <select id="status" className="form-select" {...register('status')}>
              {Object.values(TaskStatus).map((status) => (
                <option key={status} value={status}>
                  {TaskStatusLabels[status]}
                </option>
              ))}
            </select>
          </div>

          {/* Prioridad */}
          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Prioridad
            </label>
            <select id="priority" className="form-select" {...register('priority')}>
              {Object.values(TaskPriority).map((priority) => (
                <option key={priority} value={priority}>
                  {TaskPriorityLabels[priority]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fecha de vencimiento */}
        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">
            Fecha de vencimiento
          </label>
          <input
            id="dueDate"
            type="date"
            className="form-input"
            {...register('dueDate')}
          />
          {errors.dueDate && (
            <p className="form-error">{errors.dueDate.message}</p>
          )}
        </div>

        {/* Botones de acción */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}
