import { IsDateString, IsString, Matches } from 'class-validator';

// TODO : DTO 이름 컨벤션을 정하고 전체 통일성을 가질 필요가 있음
export class GetRangeSchedulesDTO {
  @IsString()
  startDate: string;

  @IsString()
  endDate: Date;

  // @Matches(`^[0-9\\s:]{1,10}$`)
  // startTime: string;

  // @Matches(`^[0-9\\s:]{1,10}$`)
  // endTime: string;

  @Matches(`^[가-힣,]{1,15}$`)
  repeatDate: string;
}
