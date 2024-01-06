import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { PaginationRequest } from 'src/common/dto/request-page.dto';

export enum StudentSearchType {
  NONE = 'none',
  NAME = 'name',
  PHONE = 'phone',
}

export class FindStudentsDto extends PaginationRequest {
  @IsEnum(StudentSearchType)
  searchBy: StudentSearchType;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(object => object.searchBy === 'name')
  name: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(object => object.searchBy === 'phone')
  phone: string;
}
