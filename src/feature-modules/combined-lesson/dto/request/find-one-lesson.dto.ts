import { IsEnum } from 'class-validator';
import { LessonType } from '../../type/lesson.type';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneLessonDTO {
  @ApiProperty({ enum: LessonType })
  @IsEnum(LessonType)
  type: LessonType;
}
