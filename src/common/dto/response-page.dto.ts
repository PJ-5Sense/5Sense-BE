import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PageMeta {
  @ApiProperty()
  @Expose()
  page: number;

  @ApiProperty()
  @Expose()
  take: number;

  @ApiProperty()
  @Expose()
  hasNextPage: boolean;

  constructor(pageMeta: PageMeta) {
    this.page = pageMeta.page;
    this.take = pageMeta.take;
    this.hasNextPage = pageMeta.hasNextPage;
  }
}
