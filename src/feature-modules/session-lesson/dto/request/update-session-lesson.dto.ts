import { IsInt, IsObject, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LessonCategory } from '../../../combined-lesson/type/lesson-category.type';

export class UpdateSessionLessonDTO {
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,20}$`)
  name: string;

  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,300}$`)
  memo: string;

  @IsObject()
  @ValidateNested()
  @Type(() => LessonCategory)
  category: LessonCategory;

  @IsInt()
  teacherId: number;
}
