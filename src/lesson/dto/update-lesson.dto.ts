import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  Matches,
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

export class UpdateSessionLessonDTO {
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,20}$`)
  name: string;

  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,300}$`)
  memo: string;

  @IsObject()
  @ValidateNested()
  @Type(() => LessonCategory)
  category: LessonCategory;

  @IsInt()
  teacherId: number;
}

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
