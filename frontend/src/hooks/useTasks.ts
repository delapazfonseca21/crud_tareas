import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import type { CreateTaskDto, UpdateTaskDto, TaskFilters } from '../types/task.types';

/**
 * Hook personalizado para gestionar tareas con TanStack Query
 * 
 * Proporciona funciones y estados para todas las operaciones CRUD
 * con cache automático, revalidación y manejo de errores.
 */
export function useTasks(filters?: TaskFilters) {
  const queryClient = useQueryClient();

  /**
   * Query para obtener todas las tareas
   * Se invalida automáticamente cuando cambian los filtros
   */
  const tasksQuery = useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => taskService.getAll(filters),
  });

  /**
   * Mutation para crear una nueva tarea
   * Invalida el cache de tareas después de crear
   */
  const createMutation = useMutation({
    mutationFn: (data: CreateTaskDto) => taskService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  /**
   * Mutation para actualizar una tarea existente
   * Invalida el cache de tareas después de actualizar
   */
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskDto }) =>
      taskService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  /**
   * Mutation para eliminar una tarea
   * Invalida el cache de tareas después de eliminar
   */
  const deleteMutation = useMutation({
    mutationFn: (id: string) => taskService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    // Datos y estados de la query
    tasks: tasksQuery.data ?? [],
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    error: tasksQuery.error,

    // Funciones de mutación
    createTask: createMutation.mutateAsync,
    updateTask: updateMutation.mutateAsync,
    deleteTask: deleteMutation.mutateAsync,

    // Estados de las mutaciones
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
