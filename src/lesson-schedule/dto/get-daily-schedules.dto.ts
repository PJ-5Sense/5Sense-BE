import { IsDateString } from 'class-validator';

export class GetDailySchedulesDTO {
  @IsDateString()
  date: Date;
}
