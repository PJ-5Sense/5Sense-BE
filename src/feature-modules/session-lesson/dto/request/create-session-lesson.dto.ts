import { IsInt, IsObject, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LessonCategory } from '../../../combined-lesson/type/lesson-category.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionLessonDTO {
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
