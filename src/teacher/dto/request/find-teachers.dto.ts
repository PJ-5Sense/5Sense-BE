import { IsEnum, IsString, ValidateIf } from 'class-validator';
import { PaginationRequest } from 'src/common/dto/request-page.dto';

export enum TeacherSearchType {
  NONE = 'none',
  NAME = 'name',
  PHONE = 'phone',
}

export class FindTeachersDto extends PaginationRequest {
  @IsEnum(TeacherSearchType)
  searchBy: TeacherSearchType;

  @IsString()
  @ValidateIf(object => object.searchBy === 'name')
  name: string;

  @IsString()
  @ValidateIf(object => object.searchBy === 'phone')
  phone: string;
}
