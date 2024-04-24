import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class GetDailySchedulesDTO {
  @ApiProperty()
  @IsDateString()
  date: string;
}
