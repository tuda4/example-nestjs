import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './tasks-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-fliter.dto';
import { ResponsespPanigation } from './dto/responses-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: TasksRepository) {
    }

  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<ResponsespPanigation> {
    const { search, status, page, page_size, sort, sort_by } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');
    let data: ResponsespPanigation = new ResponsespPanigation();
    
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${lowerCaseSearch}%` });
    }

    if (page && page_size) {
      query.skip(page_size * (page - 1)).take(page_size);
      data.page = page;
      data.page_size = page_size;
    }

    if (sort && sort_by) {
      const orderBy = sort_by || 'ASC'
      query.orderBy(`task.${sort}`, orderBy);
    }

    const tasks = await query.getMany();
    data.total = tasks.length;
    data.data = tasks;

    return data;
  }


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
    const {title, description} = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    })
    
    await this.tasksRepository.save(task);

    return task;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException({
        message: `Task with ID ${id} not found`,
        code: 1001,
        type: 'Not Found'
      });
    }
  }
}
