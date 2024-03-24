import { TaskStatus } from '../tasks-status.enum';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  search?: string;
}
