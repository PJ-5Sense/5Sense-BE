import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LessonType } from '../types/lesson.type';

export class CreateCategoryDTO {
  // 기타 소분류 추가 시, 프론트 측에서 id는 0번을 사용
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  parentId: number;
}
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

  @IsObject()
  @ValidateNested()
  @Type(() => CreateCategoryDTO)
  category: CreateCategoryDTO;

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

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsString()
  repeatDate: string;

  @IsNumber()
  roomId: number;
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

  @IsObject()
  @ValidateNested()
  @Type(() => CreateCategoryDTO)
  category: CreateCategoryDTO;

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

  @ValidateIf((o: CreateLessonDTO) => o.type === LessonType.SESSION)
  @ValidateNested()
  @Type(() => SessionLessonDTO)
  sessionLesson: SessionLessonDTO;
}
