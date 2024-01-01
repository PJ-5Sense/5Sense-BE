import { IsEnum, IsString, ValidateIf } from 'class-validator';

export enum TeacherSearchType {
  NONE = 'none',
  NAME = 'name',
  PHONE = 'phone',
}

export class FindTeachersDto {
  @IsEnum(TeacherSearchType)
  searchBy: TeacherSearchType;

  @IsString()
  @ValidateIf(object => object.searchBy === 'name')
  name: string;

  @IsString()
  @ValidateIf(object => object.searchBy === 'phone')
  phone: string;
}
