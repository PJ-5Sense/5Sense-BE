import { IsInt, IsObject, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LessonCategory } from '../../../combined-lesson/type/lesson-category.type';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSessionLessonDTO {
  @ApiProperty()
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,20}$`)
  name: string;

  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,300}$`)
  @ApiProperty()
  memo: string;

  @IsObject()
  @ValidateNested()
  @ApiProperty({ type: LessonCategory })
  @Type(() => LessonCategory)
  category: LessonCategory;

  @IsInt()
  @ApiProperty()
  teacherId: number;
}
