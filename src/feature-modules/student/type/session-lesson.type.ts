import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from 'src/feature-modules/combined-lesson/type/lesson-payment-status.type';

export class SessionSchedule {
  @ApiProperty()
  sessionDate: Date;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  room: string;

  @ApiProperty()
  restOfSessions: number;
}

export class SessionLesson {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: PaymentStatus })
  paymentStatus: PaymentStatus;

  @ApiProperty({ type: SessionSchedule, isArray: true })
  schedules: SessionSchedule[];
}
