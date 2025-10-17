import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';

/**
 * Módulo de Tareas
 * 
 * Encapsula toda la funcionalidad relacionada con la gestión de tareas.
 * Incluye el controlador, servicio y repositorio de la entidad Task.
 */
@Module({
  imports: [
    // Registrar la entidad Task para usar el repositorio
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService], // Exportar el servicio por si otros módulos lo necesitan
})
export class TasksModule {}
