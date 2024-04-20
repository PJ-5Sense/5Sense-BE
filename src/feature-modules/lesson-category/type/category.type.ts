import { ApiProperty } from '@nestjs/swagger';

export class MainCategoryType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class SubCategoryType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  parentId?: number;

  @ApiProperty()
  parentName?: string;
}
