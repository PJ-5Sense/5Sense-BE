import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LessonType } from '../types/lesson.type';

export class DurationLessonDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  memo: string;

  @IsNumber()
  lessonTime: number;

  @IsNumber()
  tuitionFee: number;

  @IsNumber()
  category: { id: number; name: string; parentId: number };

  @IsNumber()
  teacherId: number;

  @IsObject()
  @ValidateNested()
  @Type(() => DurationScheduleDTO)
  schedules: DurationScheduleDTO[];
}

export class DurationScheduleDTO {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsString()
  repeatDate: string;

  @IsNumber()
  LessonRoomId: number;
}

export class SessionLessonDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  memo: string;

  @IsNumber()
  lessonTime: number;

  @IsNumber()
  tuitionFee: number;

  @IsNumber()
  capacity: number;

  @IsNumber()
  totalSessions: number;

  @IsNumber()
  category: { id: number; name: string; parentId: number };

  @IsNumber()
  teacherId: number;
}

export class CreateLessonDTO {
  @IsEnum(LessonType)
  type: LessonType;

  @ValidateIf((o: CreateLessonDTO) => o.type === LessonType.DURATION)
  @ValidateNested()
  @Type(() => DurationLessonDTO)
  durationLesson: DurationLessonDTO;

  @ValidateIf((o: CreateLessonDTO) => o.type === LessonType.DURATION)
  @ValidateNested()
  @Type(() => SessionLessonDTO)
  sessionLesson: SessionLessonDTO;
}
