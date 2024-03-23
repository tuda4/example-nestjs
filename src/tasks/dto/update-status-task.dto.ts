import { TaskStatus } from '../tasks.model';
import { IsEnum } from 'class-validator';

export class UpdateStatusTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
