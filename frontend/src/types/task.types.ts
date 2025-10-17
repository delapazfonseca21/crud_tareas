/**
 * Tipos TypeScript para la gestión de tareas
 * Deben coincidir con los tipos del backend
 */

/**
 * Estados posibles de una tarea
 */
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

/**
 * Prioridades posibles de una tarea
 */
export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

/**
 * Interfaz principal de una tarea
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string; // ISO 8601 string
  createdAt: string;
  updatedAt: string;
}

/**
 * DTO para crear una nueva tarea
 */
export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
}

/**
 * DTO para actualizar una tarea existente
 * Todos los campos son opcionales
 */
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
}

/**
 * Filtros para listar tareas
 */
export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
}

/**
 * Labels en español para los estados
 */
export const TaskStatusLabels: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: 'Por hacer',
  [TaskStatus.IN_PROGRESS]: 'En progreso',
  [TaskStatus.DONE]: 'Completada',
};

/**
 * Labels en español para las prioridades
 */
export const TaskPriorityLabels: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: 'Baja',
  [TaskPriority.MEDIUM]: 'Media',
  [TaskPriority.HIGH]: 'Alta',
};
