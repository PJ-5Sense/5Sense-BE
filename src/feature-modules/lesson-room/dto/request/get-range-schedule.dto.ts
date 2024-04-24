import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

// TODO : DTO 이름 컨벤션을 정하고 전체 통일성을 가질 필요가 있음
export class GetRangeSchedulesDTO {
  @IsString()
  @ApiProperty()
  startDate: string;

  @IsString()
  @ApiProperty()
  endDate: Date;

  @Matches(`^[가-힣,]{1,15}$`)
  @ApiProperty()
  repeatDate: string;
}
