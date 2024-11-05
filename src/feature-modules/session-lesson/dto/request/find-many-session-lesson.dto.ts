import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt } from 'class-validator';

export class FindManySessionLessonDTO {
  @ApiProperty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isCheckRegistrationsCount: boolean;

  @ApiProperty()
  @IsInt()
  lessonTimeLimit = 0;
}
