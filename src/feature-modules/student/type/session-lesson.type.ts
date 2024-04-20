import { ApiProperty } from '@nestjs/swagger';

export class SessionLesson {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  totalSessions: number;

  @ApiProperty()
  sessionCount: number;
}
