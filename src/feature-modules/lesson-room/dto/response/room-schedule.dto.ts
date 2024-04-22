import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { LessonType } from 'src/feature-modules/combined-lesson/type/lesson.type';

export class TimeSlot {
  @ApiProperty({ example: 1, description: '클래스 아이디' })
  id: number;

  @ApiProperty({ example: 'duration', enum: LessonType, description: '클래스 타입 - duration, session' })
  type: LessonType;

  @ApiProperty({ example: '꽁꽁 얼어붙은 한강위로 고양이가 날라다닙니다.', description: '클래스 이름ㄴ' })
  name: string;

  @ApiProperty({ example: 60, description: '클래스 수업 시간' })
  lessonTime: number;

  @ApiProperty({ example: '우도욱', description: '강사 이름' })
  teacher: string;

  @ApiProperty({ example: false, description: '예약 가능 여부' })
  isOpenForBooking: boolean;

  @ApiProperty({ example: 5, description: '회차반인 경우 수강등록 허용 인원', required: false })
  capacity?: number;

  @ApiProperty({ example: 5, description: '현재 등록된 수강등록 인원', required: false })
  studentCount?: number;
}

export class ResponseRoomScheduleDTO {
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
        type: 'duration',
        name: '꽁꽁 얼어붙은 한강위로 고양이가 날라다닙니다.',
        lessonTime: 60,
        teacher: '우도욱',
        isOpenForBooking: false,
      },
      '14:00': {
        id: 2,
        type: 'session',
        name: '꽁꽁 얼어붙은 한강위로 고양이가 날라다닙니다.',
        lessonTime: 60,
        teacher: '우도욱',
        capacity: 5,
        studentCount: 3,
        isOpenForBooking: true,
      },
      '15:00': {
        isOpenForBooking: true,
      },
    },

    description: '클래스 정보',
  })
  workTime: Record<string, TimeSlot>;
}
