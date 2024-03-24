import { EntityRepository, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';

export class TasksRepository extends Repository<Task> {
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

