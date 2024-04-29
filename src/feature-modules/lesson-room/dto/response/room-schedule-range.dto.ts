import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class TimeSlot {
  @ApiProperty({ example: 1, description: '클래스 아이디' })
  id: number;

  @ApiProperty({ example: false, description: '예약 가능 여부' })
  isOpenForBooking: boolean;
}

export class ResponseRoomScheduleRangeDTO {
  @ApiProperty({ example: 1, description: '룸 아이디' })
  id: number;

  @ApiProperty({ example: 'A 룸', description: '룸 이름' })
  name: string;

  @ApiProperty({ example: 20, description: '룸 허용 인원' })
  capacity: number;

  @Type(() => TimeSlot)
  @ApiProperty({
    example: {
      '13:00': {
        id: 1,
        isOpenForBooking: false,
      },
      '14:00': {
        id: 2,
        isOpenForBooking: true,
      },
      '15:00': {
        id: 3,
        isOpenForBooking: true,
      },
    },

    description: '클래스 정보',
  })
  workTime: Record<string, TimeSlot>;
}
