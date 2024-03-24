import { TaskStatus } from '../tasks-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateStatusTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
