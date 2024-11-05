import { ApiProperty } from '@nestjs/swagger';

export class DurationSchedule {
  @ApiProperty()
  id: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  repeatDate: string;
}

// TODO : 이름이.. 모호함 조금 애매함이 없도록 바꿔야함
export class DurationLesson {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: DurationSchedule, isArray: true })
  schedules: DurationSchedule[];
}
