import { ApiProperty } from '@nestjs/swagger';

export class SessionLesson {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sessionCount: number;

  @ApiProperty()
  totalSessions: number;
}
