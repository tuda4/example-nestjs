import { TaskStatus } from '../tasks-status.enum';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

enum SortBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum Sort {
  ID = 'id',
  TITLE = 'title',
  DESCRIPTION = 'description',
  STATUS = 'status',
}

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  search?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  page_size?: number;

  @IsOptional()
  @IsEnum(Sort)
  sort?: Sort;

  @IsOptional()
  @IsEnum(SortBy)
  sort_by?: SortBy; 
}
