import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusTaskDto } from './dto/update-status-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-fliter.dto';

// The @Controller() decorator is a class decorator that defines a controller.
// A controller is responsible for handling incoming requests and returning responses to the client.
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get()
  getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    console.log(filterDto);
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task | undefined {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createNewTask(@Body() createTask: CreateTaskDto): Task {
    return this.tasksService.createTask(createTask);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') updateStatus: UpdateStatusTaskDto
  ): Task {
    return this.tasksService.updateTaskStatus(id, updateStatus.status)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }
}
