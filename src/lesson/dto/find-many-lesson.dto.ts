import { Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsInt } from 'class-validator';
import { PaginationRequest } from 'src/common/dto/request-page.dto';

export class FindManyByDateDTO {
  @IsInt()
  @Type(() => Number)
  year: number;

  @IsInt()
  @Type(() => Number)
  month: number;
}

export class FindManyByFilterDTO extends PaginationRequest {
  @IsIn(['duration', 'session', 'all'])
  type: 'duration' | 'session' | 'all';

  @IsArray()
  @Transform((o: any) => {
    return !o.value ? [] : o.value.split(',').filter(String);
  })
  teachers: string[];

  @IsArray()
  @Transform((o: any) => {
    return !o.value ? [] : o.value.split(',').filter(Number);
  })
  categories: number[];
}
