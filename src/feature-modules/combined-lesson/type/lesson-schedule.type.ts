import { ApiProperty } from '@nestjs/swagger';

export class DurationScheduleType {
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

  @ApiProperty({ example: { id: 1, name: 'A 룸' } })
  room: {
    id: number;
    name: string;
  };
}
