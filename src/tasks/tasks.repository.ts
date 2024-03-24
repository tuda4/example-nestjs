import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-fliter.dto';

export class TasksRepository extends Repository<Task> {
  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status, page, page_size} = filterDto;
    const query = this.createQueryBuilder('task');
    
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${lowerCaseSearch}%` });
    }

    if (page && page_size) {
      query.skip(page_size * (page - 1)).take(page_size);
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async createTask (createTaskDto: CreateTaskDto): Promise<Task> {
    const {title, description} = createTaskDto;
    console.log(title, description);
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    })
    await this.save(task);

    return task;
  }
}

