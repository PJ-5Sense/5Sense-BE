import { IsEnum } from 'class-validator';
import { LessonType } from '../types/lesson.type';

export class FindOneLessonDTO {
  @IsEnum(LessonType)
  type: LessonType;
}
