import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, Matches } from 'class-validator';

export class CreateSessionScheduleDTO {
  @ApiProperty()
  @IsInt()
  lessonId: number;

  @ApiProperty()
  @IsInt()
  studentId: number;

  @ApiProperty()
  @IsDateString()
  sessionDate: Date;

  @ApiProperty({ example: '09:00' })
  @Matches(`^[0-9\\s:]{1,10}$`)
  startTime: string;

  @ApiProperty({ example: '10:00' })
  @Matches(`^[0-9\\s:]{1,10}$`)
  endTime: string;

  @ApiProperty()
  @IsInt()
  roomId: number;
}
