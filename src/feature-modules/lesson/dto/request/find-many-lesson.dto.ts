import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsInt } from 'class-validator';
import { PaginationRequest } from 'src/common/dto/request-page.dto';

export class FindManyByDateDTO {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  year: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  month: number;
}

export class FindManyByFilterDTO extends PaginationRequest {
  @ApiProperty({ enum: ['duration', 'session', 'all'] })
  @IsIn(['duration', 'session', 'all'])
  type: 'duration' | 'session' | 'all';

  // 강사 번호로 검색
  @ApiProperty({ type: 'string', example: '1,2,3', required: false })
  @IsArray()
  @Transform((o: any) => {
    return !o.value ? [] : o.value.split(',').filter(Number);
  })
  teachers: number[] = [];

  // 카테고리 번호로 검색
  @ApiProperty({ type: 'string', example: '1,2,3', required: false })
  @IsArray()
  @Transform((o: any) => {
    return !o.value ? [] : o.value.split(',').filter(Number);
  })
  categories: number[] = [];
}
