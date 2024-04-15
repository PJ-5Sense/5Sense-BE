import { ApiProperty } from '@nestjs/swagger';

export class PageMeta {
  @ApiProperty()
  page: number;

  @ApiProperty()
  take: number;

  @ApiProperty()
  hasNextPage: boolean;

  constructor(pageMeta: PageMeta) {
    this.page = pageMeta.page;
    this.take = pageMeta.take;
    this.hasNextPage = pageMeta.hasNextPage;
  }
}
