import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { PaginationRequest } from 'src/common/dto/request-page.dto';

export enum TeacherSearchType {
  NONE = 'none',
  NAME = 'name',
  PHONE = 'phone',
}

export class FindTeachersDTO extends PaginationRequest {
  @ApiProperty({ description: '검색 대상', enum: TeacherSearchType })
  @IsEnum(TeacherSearchType)
  searchBy: TeacherSearchType;

  @ApiProperty({ description: '이름 검색 문자열' })
  @IsString()
  @IsNotEmpty()
  @ValidateIf(object => object.searchBy === 'name')
  name: string;

  @ApiProperty({ description: '휴대번호 검색 문자열' })
  @IsString()
  @IsNotEmpty()
  @ValidateIf(object => object.searchBy === 'phone')
  phone: string;
}
