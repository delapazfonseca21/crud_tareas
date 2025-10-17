import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskPriority } from '../enums/task-priority.enum';

/**
 * Entidad Task que representa una tarea en la base de datos
 * 
 * Esta entidad mapea la tabla 'tasks' en PostgreSQL y define
 * todos los campos necesarios para gestionar tareas.
 */
@Entity('tasks')
export class Task {
  /**
   * Identificador único de la tarea (UUID)
   * Generado automáticamente por la base de datos
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Título de la tarea
   * Obligatorio, longitud entre 1 y 100 caracteres
   */
  @Column({ type: 'varchar', length: 100 })
  title: string;

  /**
   * Descripción detallada de la tarea
   * Opcional, máximo 500 caracteres
   */
  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  /**
   * Estado actual de la tarea
   * Valores posibles: 'todo', 'in_progress', 'done'
   * Valor por defecto: 'todo'
   */
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  /**
   * Prioridad de la tarea
   * Valores posibles: 'low', 'medium', 'high'
   * Valor por defecto: 'medium'
   */
  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  /**
   * Fecha de vencimiento de la tarea
   * Opcional, puede ser null
   */
  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  /**
   * Fecha de creación de la tarea
   * Generada automáticamente al crear el registro
   */
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  /**
   * Fecha de última actualización de la tarea
   * Actualizada automáticamente al modificar el registro
   */
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
