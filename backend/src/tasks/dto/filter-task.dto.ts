import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskPriority } from '../enums/task-priority.enum';

/**
 * DTO para filtrar tareas en el endpoint GET /tasks
 * 
 * Permite filtrar tareas por estado y/o prioridad mediante query parameters.
 * Ejemplo: GET /tasks?status=in_progress&priority=high
 */
export class FilterTaskDto {
  /**
   * Filtrar por estado de la tarea
   * Opcional, valores: 'todo', 'in_progress', 'done'
   */
  @ApiPropertyOptional({
    description: 'Filtrar tareas por estado',
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
  })
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'El estado debe ser uno de: todo, in_progress, done',
  })
  status?: TaskStatus;

  /**
   * Filtrar por prioridad de la tarea
   * Opcional, valores: 'low', 'medium', 'high'
   */
  @ApiPropertyOptional({
    description: 'Filtrar tareas por prioridad',
    enum: TaskPriority,
    example: TaskPriority.HIGH,
  })
  @IsOptional()
  @IsEnum(TaskPriority, {
    message: 'La prioridad debe ser una de: low, medium, high',
  })
  priority?: TaskPriority;
}
