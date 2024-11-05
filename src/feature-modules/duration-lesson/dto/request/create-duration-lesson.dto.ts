import { ArrayNotEmpty, IsArray, IsDateString, IsInt, IsObject, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LessonCategory } from '../../../combined-lesson/type/lesson-category.type';
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

  @ApiProperty()
  @Matches(`^[가-힣,]{1,15}$`)
  repeatDate: string;

  @ApiProperty()
  @IsInt()
  lessonTime: number;

  @ApiProperty()
  @IsInt()
  roomId: number;
}

export class CreateDurationLessonDTO {
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

  @ApiProperty({ type: DurationScheduleDTO, isArray: true })
  @IsArray()
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => DurationScheduleDTO)
  schedules: DurationScheduleDTO[];
}
