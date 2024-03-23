import { TaskStatus } from '../tasks.model';
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
