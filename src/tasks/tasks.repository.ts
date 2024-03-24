import { EntityRepository, Repository } from 'typeorm';
import { Task } from './tasks.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  // Add your custom methods here
}

