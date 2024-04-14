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
import { LessonType } from '../../type/lesson.type';
import { LessonCategory } from '../../type/lesson-category.type';
import { ApiProperty } from '@nestjs/swagger';

export class DurationScheduleDTO {
  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  endDate: Date;

  @ApiProperty({ example: '10:00' })
  @Matches(`^[0-9\\s:]{1,10}$`)
  startTime: string;

  @ApiProperty({ example: '11:00' })
  @Matches(`^[0-9\\s:]{1,10}$`)
  endTime: string;

  @ApiProperty({ example: '월,화,수,목,금' })
  @Matches(`^[가-힣,]{1,15}$`)
  repeatDate: string;

  @ApiProperty()
  @IsInt()
  lessonTime: number;

  @ApiProperty()
  @IsInt()
  roomId: number;
}

export class DurationLessonDTO {
  @ApiProperty()
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,20}$`)
  name: string;

  @ApiProperty()
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{0,300}$`)
  memo: string;

  @ApiProperty()
  @IsInt()
  tuitionFee: number;

  @ApiProperty({ type: LessonCategory })
  @IsObject()
  @ValidateNested()
  @Type(() => LessonCategory)
  category: LessonCategory;

  @ApiProperty()
  @IsInt()
  teacherId: number;

  @ApiProperty({ type: DurationScheduleDTO })
  @IsArray()
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => DurationScheduleDTO)
  schedules: DurationScheduleDTO[];
}

export class SessionLessonDTO {
  @ApiProperty()
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,20}$`)
  name: string;

  @ApiProperty()
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{0,300}$`)
  memo: string;

  @ApiProperty()
  @IsInt()
  lessonTime: number;

  @ApiProperty()
  @IsInt()
  tuitionFee: number;

  @ApiProperty()
  @IsInt()
  capacity: number;

  @ApiProperty()
  @IsInt()
  totalSessions: number;

  @ApiProperty({ type: LessonCategory })
  @IsObject()
  @ValidateNested()
  @Type(() => LessonCategory)
  category: LessonCategory;

  @ApiProperty()
  @IsInt()
  teacherId: number;
}

export class CreateLessonDTO {
  @ApiProperty({ type: 'enum', enum: LessonType, examples: [LessonType.DURATION, LessonType.SESSION] })
  @IsEnum(LessonType)
  type: LessonType;

  @ApiProperty({ type: DurationLessonDTO })
  @ValidateIf((o: CreateLessonDTO) => o.type === LessonType.DURATION)
  @ValidateNested()
  @Type(() => DurationLessonDTO)
  durationLesson: DurationLessonDTO;

  @ApiProperty({ type: SessionLessonDTO })
  @ValidateIf((o: CreateLessonDTO) => o.type === LessonType.SESSION)
  @ValidateNested()
  @Type(() => SessionLessonDTO)
  sessionLesson: SessionLessonDTO;
}
