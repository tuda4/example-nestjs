import { TaskStatus } from '../tasks.model';

export class UpdateStatusTaskDto {
  id: string;
  status: TaskStatus;
}
