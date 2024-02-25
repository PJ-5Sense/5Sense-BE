import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
export class FindManyByDateDTO {
  @IsInt()
  @Type(() => Number)
  year: number;

  @IsInt()
  @Type(() => Number)
  month: number;
}

export class FindManyByFilterDTO {
  lessonType: string;
  teacherName: string;
  category: number;
  offset: number;
  limit: number;
}
