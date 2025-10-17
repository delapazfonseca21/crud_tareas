import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskPriority } from '../enums/task-priority.enum';

/**
 * DTO para crear una nueva tarea
 * 
 * Define los campos requeridos y opcionales para crear una tarea,
 * incluyendo validaciones y documentación para Swagger.
 */
export class CreateTaskDto {
  /**
   * Título de la tarea
   * Obligatorio, entre 1 y 100 caracteres
   */
  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Implementar autenticación JWT',
    minLength: 1,
    maxLength: 100,
  })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MinLength(1, { message: 'El título debe tener al menos 1 carácter' })
  @MaxLength(100, { message: 'El título no puede exceder 100 caracteres' })
  title: string;

  /**
   * Descripción detallada de la tarea
   * Opcional, máximo 500 caracteres
   */
  @ApiPropertyOptional({
    description: 'Descripción detallada de la tarea',
    example: 'Implementar sistema de autenticación con JWT y guards de NestJS',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
  description?: string;

  /**
   * Estado de la tarea
   * Opcional, valores: 'todo', 'in_progress', 'done'
   * Por defecto: 'todo'
   */
  @ApiPropertyOptional({
    description: 'Estado de la tarea',
    enum: TaskStatus,
    example: TaskStatus.TODO,
    default: TaskStatus.TODO,
  })
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'El estado debe ser uno de: todo, in_progress, done',
  })
  status?: TaskStatus;

  /**
   * Prioridad de la tarea
   * Opcional, valores: 'low', 'medium', 'high'
   * Por defecto: 'medium'
   */
  @ApiPropertyOptional({
    description: 'Prioridad de la tarea',
    enum: TaskPriority,
    example: TaskPriority.MEDIUM,
    default: TaskPriority.MEDIUM,
  })
  @IsOptional()
  @IsEnum(TaskPriority, {
    message: 'La prioridad debe ser una de: low, medium, high',
  })
  priority?: TaskPriority;

  /**
   * Fecha de vencimiento de la tarea
   * Opcional, formato ISO 8601
   */
  @ApiPropertyOptional({
    description: 'Fecha de vencimiento de la tarea (formato ISO 8601)',
    example: '2025-10-20T00:00:00.000Z',
    type: String,
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha de vencimiento debe estar en formato ISO 8601' },
  )
  dueDate?: Date;
}
