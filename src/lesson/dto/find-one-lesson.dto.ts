import { Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class FindOneLessonDTO {
  @IsBoolean()
  @Type(() => Boolean)
  includeStudents: boolean;
}
