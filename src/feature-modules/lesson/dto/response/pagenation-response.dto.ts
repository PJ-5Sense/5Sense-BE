import { ApiProperty } from '@nestjs/swagger';
import { ResponseFilteredLessonDTO } from 'src/feature-modules/lesson/dto/response/filtered-lesson.dto';

export class PageNationMeta {
  @ApiProperty()
  page: number;

  @ApiProperty()
  take: number;

  @ApiProperty()
  hasNextPage: boolean;

  constructor(page: number, take: number, hasNextPage: boolean) {
    this.page = page;
    this.take = take;
    this.hasNextPage = hasNextPage;
  }
}
// TODO : generic하게 타입을 받아서 사용하도록 변경해야함
export class PaginatedResponseFilteredLessonDTO {
  @ApiProperty({
    type: [ResponseFilteredLessonDTO],
  })
  lessons: ResponseFilteredLessonDTO[];

  @ApiProperty({ type: PageNationMeta })
  meta: PageNationMeta;

  constructor(lessons: ResponseFilteredLessonDTO[], page: number, take: number, hasNextPage: boolean) {
    this.lessons = lessons;
    this.meta = new PageNationMeta(page, take, hasNextPage);
  }
}
