import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LessonCategory } from '../../../combined-lesson/type/lesson-category.type';

export class UpdateDurationScheduleDTO {
  @IsInt()
  id: number;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsString()
  repeatDate: string;

  @IsInt()
  lessonTime: number;

  @IsInt()
  roomId: number;
}

export class UpdateDurationLessonDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  memo: string;

  @IsInt()
  tuitionFee: number;

  @IsInt()
  teacherId: number;

  @IsObject()
  @ValidateNested()
  @Type(() => LessonCategory)
  category: LessonCategory;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => UpdateDurationScheduleDTO)
  schedules: UpdateDurationScheduleDTO[];
}
