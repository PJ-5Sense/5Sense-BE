import { ApiProperty } from '@nestjs/swagger';
import { MainCategoryType, SubCategoryType } from '../../type/category.type';

export class ResponseGetCategoryDTO {
  @ApiProperty({ type: MainCategoryType, isArray: true })
  mainCategory: MainCategoryType[];

  @ApiProperty({ type: SubCategoryType, isArray: true })
  subCategory: SubCategoryType[];
}
