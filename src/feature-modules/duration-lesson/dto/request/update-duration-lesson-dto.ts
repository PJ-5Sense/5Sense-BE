import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LessonCategory } from '../../../combined-lesson/type/lesson-category.type';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDurationScheduleDTO {
  @ApiProperty()
  @IsInt()
  id: number;

  @IsString()
  @ApiProperty()
  startTime: string;

  @IsString()
  @ApiProperty()
  endTime: string;

  @IsString()
  @ApiProperty()
  repeatDate: string;

  @IsInt()
  @ApiProperty()
  lessonTime: number;

  @IsInt()
  @ApiProperty()
  roomId: number;
}

export class UpdateDurationLessonDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  memo: string;

  @IsInt()
  @ApiProperty()
  tuitionFee: number;

  @IsInt()
  @ApiProperty()
  teacherId: number;

  @IsObject()
  @ValidateNested()
  @ApiProperty({ type: LessonCategory })
  @Type(() => LessonCategory)
  category: LessonCategory;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @ApiProperty({ type: UpdateDurationScheduleDTO, isArray: true })
  @Type(() => UpdateDurationScheduleDTO)
  schedules: UpdateDurationScheduleDTO[];
}
