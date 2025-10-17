import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

/**
 * Servicio que contiene la lógica de negocio para gestionar tareas
 * 
 * Implementa operaciones CRUD completas y filtrado de tareas.
 * Utiliza TypeORM Repository para interactuar con la base de datos.
 */
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  /**
   * Crear una nueva tarea
   * 
   * @param createTaskDto - Datos para crear la tarea
   * @returns La tarea creada con su ID generado
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // Crear instancia de la entidad con los datos del DTO
    const task = this.taskRepository.create(createTaskDto);
    
    // Guardar en la base de datos
    return await this.taskRepository.save(task);
  }

  /**
   * Obtener todas las tareas con filtros opcionales
   * 
   * @param filterDto - Filtros opcionales por estado y/o prioridad
   * @returns Array de tareas que cumplen con los filtros
   */
  async findAll(filterDto: FilterTaskDto): Promise<Task[]> {
    const { status, priority } = filterDto;

    // Construir query con filtros dinámicos
    const query = this.taskRepository.createQueryBuilder('task');

    // Aplicar filtro por estado si existe
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    // Aplicar filtro por prioridad si existe
    if (priority) {
      query.andWhere('task.priority = :priority', { priority });
    }

    // Ordenar por fecha de creación descendente (más recientes primero)
    query.orderBy('task.createdAt', 'DESC');

    return await query.getMany();
  }

  /**
   * Obtener una tarea por su ID
   * 
   * @param id - UUID de la tarea
   * @returns La tarea encontrada
   * @throws NotFoundException si la tarea no existe
   */
  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Tarea con ID "${id}" no encontrada`);
    }

    return task;
  }

  /**
   * Actualizar una tarea existente
   * 
   * @param id - UUID de la tarea a actualizar
   * @param updateTaskDto - Datos a actualizar (parciales)
   * @returns La tarea actualizada
   * @throws NotFoundException si la tarea no existe
   */
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    // Verificar que la tarea existe
    const task = await this.findOne(id);

    // Aplicar los cambios al objeto
    Object.assign(task, updateTaskDto);

    // Guardar los cambios en la base de datos
    return await this.taskRepository.save(task);
  }

  /**
   * Eliminar una tarea
   * 
   * @param id - UUID de la tarea a eliminar
   * @returns void
   * @throws NotFoundException si la tarea no existe
   */
  async remove(id: string): Promise<void> {
    // Verificar que la tarea existe antes de eliminar
    const task = await this.findOne(id);

    // Eliminar la tarea de la base de datos
    await this.taskRepository.remove(task);
  }
}
