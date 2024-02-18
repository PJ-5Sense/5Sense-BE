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
import { LessonType } from '../entities/lesson.entity';
import { Type } from 'class-transformer';

export class DurationLessonDTO {
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
}

export class CreateLessonDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(LessonType)
  type: LessonType;

  @IsString()
  memo: string;

  @IsNumber()
  tuitionFee: number;

  @IsNumber()
  capacity: number;

  // 기타 카테고리, 학원에서 직접 추가하는 기능은 개발중
  @IsObject()
  category: { id: number; name: string };

  @IsNumber()
  teacherId: number;

  @ValidateIf((o: CreateLessonDTO) => o.type === LessonType.DURATION)
  @ValidateNested()
  @Type(() => DurationLessonDTO)
  durationLesson: DurationLessonDTO;
}
