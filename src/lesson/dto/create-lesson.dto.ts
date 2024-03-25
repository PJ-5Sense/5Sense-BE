import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsObject,
  Matches,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LessonType } from '../types/lesson.type';
import { LessonCategory } from '../types/lesson-category.type';

export class DurationLessonDTO {
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,20}$`)
  name: string;

  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,300}$`)
  memo: string;

  @IsInt()
  lessonTime: number;

  @IsInt()
  tuitionFee: number;

  @IsObject()
  @ValidateNested()
  @Type(() => LessonCategory)
  category: LessonCategory;

  @IsInt()
  teacherId: number;

  @IsArray()
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => DurationScheduleDTO)
  schedules: DurationScheduleDTO[];
}

export class DurationScheduleDTO {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @Matches(`^[0-9\\s:]{1,10}$`)
  startTime: string;

  @Matches(`^[0-9\\s:]{1,10}$`)
  endTime: string;

  @Matches(`^[가-힣,]{1,15}$`)
  repeatDate: string;

  @IsInt()
  roomId: number;
}

export class SessionLessonDTO {
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,20}$`)
  name: string;

  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,300}$`)
  memo: string;

  @IsInt()
  lessonTime: number;

  @IsInt()
  tuitionFee: number;

  @IsInt()
  capacity: number;

  @IsInt()
  totalSessions: number;

  @IsObject()
  @ValidateNested()
  @Type(() => LessonCategory)
  category: LessonCategory;

  @IsInt()
  teacherId: number;
}

export class CreateLessonDTO {
  @IsEnum(LessonType)
  type: LessonType;

  @ValidateIf((o: CreateLessonDTO) => o.type === LessonType.DURATION)
  @ValidateNested()
  @Type(() => DurationLessonDTO)
  durationLesson: DurationLessonDTO;

  @ValidateIf((o: CreateLessonDTO) => o.type === LessonType.SESSION)
  @ValidateNested()
  @Type(() => SessionLessonDTO)
  sessionLesson: SessionLessonDTO;
}
