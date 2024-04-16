import { IsEnum } from 'class-validator';
import { LessonType } from '../../type/lesson.type';

export class CloseLessonDTO {
  @IsEnum(LessonType)
  type: LessonType;
}
