import axios from 'axios';
import type { Task, CreateTaskDto, UpdateTaskDto, TaskFilters } from '../types/task.types';

/**
 * URL base de la API
 * Se obtiene de las variables de entorno
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Instancia de axios configurada para la API de tareas
 */
const api = axios.create({
  baseURL: `${API_URL}/tasks`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Servicio para interactuar con la API de tareas
 * Implementa todas las operaciones CRUD
 */
export const taskService = {
  /**
   * Obtener todas las tareas con filtros opcionales
   * @param filters - Filtros por estado y/o prioridad
   * @returns Promise con array de tareas
   */
  async getAll(filters?: TaskFilters): Promise<Task[]> {
    const params = new URLSearchParams();
    
    if (filters?.status) {
      params.append('status', filters.status);
    }
    
    if (filters?.priority) {
      params.append('priority', filters.priority);
    }

    const response = await api.get<Task[]>('', { params });
    return response.data;
  },

  /**
   * Obtener una tarea por su ID
   * @param id - UUID de la tarea
   * @returns Promise con la tarea
   */
  async getById(id: string): Promise<Task> {
    const response = await api.get<Task>(`/${id}`);
    return response.data;
  },

  /**
   * Crear una nueva tarea
   * @param data - Datos de la tarea a crear
   * @returns Promise con la tarea creada
   */
  async create(data: CreateTaskDto): Promise<Task> {
    const response = await api.post<Task>('', data);
    return response.data;
  },

  /**
   * Actualizar una tarea existente
   * @param id - UUID de la tarea
   * @param data - Datos a actualizar (parciales)
   * @returns Promise con la tarea actualizada
   */
  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const response = await api.patch<Task>(`/${id}`, data);
    return response.data;
  },

  /**
   * Eliminar una tarea
   * @param id - UUID de la tarea a eliminar
   * @returns Promise vacía
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/${id}`);
  },
};
