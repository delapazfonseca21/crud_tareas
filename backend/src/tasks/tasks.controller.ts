import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './entities/task.entity';

/**
 * Controlador REST para gestionar tareas
 * 
 * Expone endpoints HTTP para operaciones CRUD completas sobre tareas.
 * Incluye documentación Swagger para cada endpoint.
 */
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Crear una nueva tarea
   * POST /tasks
   */
  @Post()
  @ApiOperation({ 
    summary: 'Crear una nueva tarea',
    description: 'Crea una nueva tarea con los datos proporcionados. Los campos status y priority tienen valores por defecto si no se especifican.',
  })
  @ApiResponse({
    status: 201,
    description: 'Tarea creada exitosamente',
    type: Task,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.create(createTaskDto);
  }

  /**
   * Obtener todas las tareas con filtros opcionales
   * GET /tasks?status=todo&priority=high
   */
  @Get()
  @ApiOperation({
    summary: 'Listar todas las tareas',
    description: 'Obtiene todas las tareas. Permite filtrar por estado y/o prioridad mediante query parameters.',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['todo', 'in_progress', 'done'],
    description: 'Filtrar por estado de la tarea',
  })
  @ApiQuery({
    name: 'priority',
    required: false,
    enum: ['low', 'medium', 'high'],
    description: 'Filtrar por prioridad de la tarea',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tareas obtenida exitosamente',
    type: [Task],
  })
  async findAll(@Query() filterDto: FilterTaskDto): Promise<Task[]> {
    return await this.tasksService.findAll(filterDto);
  }

  /**
   * Obtener una tarea específica por ID
   * GET /tasks/:id
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una tarea por ID',
    description: 'Obtiene los detalles de una tarea específica mediante su UUID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la tarea',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Tarea encontrada',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarea no encontrada',
  })
  async findOne(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.findOne(id);
  }

  /**
   * Actualizar una tarea existente
   * PATCH /tasks/:id
   */
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una tarea',
    description: 'Actualiza parcialmente una tarea existente. Solo se actualizan los campos proporcionados.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la tarea a actualizar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Tarea actualizada exitosamente',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarea no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.update(id, updateTaskDto);
  }

  /**
   * Eliminar una tarea
   * DELETE /tasks/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar una tarea',
    description: 'Elimina permanentemente una tarea de la base de datos.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la tarea a eliminar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Tarea eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarea no encontrada',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.tasksService.remove(id);
  }
}
