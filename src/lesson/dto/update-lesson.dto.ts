import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { SessionLessonDTO } from './create-lesson.dto';
import { Type } from 'class-transformer';
import { LessonType } from '../types/lesson.type';
import { LessonCategory } from '../types/lesson-category.type';

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
  roomId: number;
}

export class UpdateDurationLessonDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  memo: string;

  @IsInt()
  lessonTime: number;

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

export class UpdateSessionLessonDTO extends SessionLessonDTO {}

export class UpdateLessonDTO {
  @IsEnum(LessonType)
  type: LessonType;

  @ValidateIf((o: UpdateLessonDTO) => o.type === LessonType.DURATION)
  @ValidateNested()
  @Type(() => UpdateDurationLessonDTO)
  durationLesson: UpdateDurationLessonDTO;

  @ValidateIf((o: UpdateLessonDTO) => o.type === LessonType.DURATION)
  @ValidateNested()
  @Type(() => UpdateSessionLessonDTO)
  sessionLesson: UpdateSessionLessonDTO;
}
