import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
export class FindManyByDateDTO {
  // 메인에서 보여주는것과 클래스 관리에서 보여주는 것 구분하기
  // 구분해야하는 이유
  @IsNumber()
  @Type(() => Number)
  year: number;
  @IsNumber()
  @Type(() => Number)
  month: number;
  // day: number;
  // dateType: string; // 일, 주, 월
}

export class FindManyByFilterDTO {
  lessonType: string;
  teacherName: string;
  category: number;
  limit: number;
}
