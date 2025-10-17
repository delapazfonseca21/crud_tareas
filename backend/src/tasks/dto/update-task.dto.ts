import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

/**
 * DTO para actualizar una tarea existente
 * 
 * Hereda todos los campos de CreateTaskDto pero los hace opcionales
 * usando PartialType de Swagger, lo que permite actualizaciones parciales.
 * 
 * Esto significa que el cliente puede enviar solo los campos que desea actualizar,
 * sin necesidad de enviar todos los campos de la tarea.
 */
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
