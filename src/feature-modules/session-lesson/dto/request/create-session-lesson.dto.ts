import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsObject, Matches, ValidateNested } from 'class-validator';
import { LessonCategory } from 'src/feature-modules/combined-lesson/type/lesson-category.type';

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
