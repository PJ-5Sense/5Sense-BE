import { IsEnum, IsString, ValidateIf } from 'class-validator';

export enum StudentSearchType {
  NONE = 'none',
  NAME = 'name',
  PHONE = 'phone',
}
export class FindStudentsDto {
  @IsEnum(StudentSearchType)
  searchBy: StudentSearchType;

  @IsString()
  @ValidateIf(object => object.searchBy === 'name')
  name: string;

  @IsString()
  @ValidateIf(object => object.searchBy === 'phone')
  phone: string;
}
