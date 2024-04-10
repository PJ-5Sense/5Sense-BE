import { IsEnum } from 'class-validator';
import { LessonType } from '../types/lesson.type';

export class CloseLessonDTO {
  @IsEnum(LessonType)
  type: LessonType;
}
