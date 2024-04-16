import { ApiProperty } from '@nestjs/swagger';
import { PageMeta } from 'src/common/dto/response-page.dto';
import { ResponseFilteredLessonDTO } from 'src/feature-modules/combined-lesson/dto/response/filtered-lesson.dto';

// TODO : generic하게 타입을 받아서 사용하도록 변경해야함
export class PaginatedResponseFilteredLessonDTO {
  @ApiProperty({
    type: [ResponseFilteredLessonDTO],
  })
  lessons: ResponseFilteredLessonDTO[];

  @ApiProperty({ type: PageMeta })
  meta: PageMeta;

  constructor(lessons: ResponseFilteredLessonDTO[], page: number, take: number, hasNextPage: boolean) {
    this.lessons = lessons;
    this.meta = new PageMeta({ page, take, hasNextPage });
  }
}
