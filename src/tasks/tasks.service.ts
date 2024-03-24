import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: TasksRepository) {
    }
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       return task.title.includes(search) || task.description.includes(search);
  //     });
  //   }

  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({id});
    if (!task) {
      throw new NotFoundException({
        message: `Task with ID ${id} not found`,
        code: 1001,
        type: 'Not Found'
      });
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    // return this.tasksRepository.createTask(createTaskDto);
    const {title, description} = createTaskDto;
    console.log(title, description);
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    })
    await this.tasksRepository.save(task);

    return task;
  }

  // createTask(createTask: CreateTaskDto): Task {
  //   const { title, description } = createTask;
  //   const id = uuid();
  //   const task: Task = {
  //     id,
  //     title,
  //     description,
  //     status: TaskStatus.OPEN
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);

  //   task.status = status;

  //   return task;
  // }

  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
}
