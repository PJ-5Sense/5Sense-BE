import { Expose } from 'class-transformer';
import { StudentEntity } from 'src/feature-modules/student/entity/student.entity';
import { DurationLesson } from '../../type/duration-lesson.type';
import { ApiProperty } from '@nestjs/swagger';
import { SessionLesson } from '../../type/session-lesson.type';

export class ResponseStudentDetailDTO {
  @ApiProperty()
  @Expose()
  readonly id: number;

  @ApiProperty()
  @Expose()
  readonly name: string;

  @ApiProperty()
  @Expose()
  readonly phone: string;

  @ApiProperty()
  @Expose()
  readonly particulars: string;

  @ApiProperty({ type: [DurationLesson] })
  @Expose()
  durationLessons: DurationLesson[];

  @ApiProperty({ type: [SessionLesson] })
  @Expose()
  sessionLessons: SessionLesson[];

  constructor(student: StudentEntity) {
    if (!student) return null;

    this.id = student.id;
    this.name = student.name;
    this.phone = student.phone;
    this.particulars = student.particulars;
    // 결제 상태 -> duration, session 정보
    // duration에서 스케쥴 정보
    // session lesson -> registration -> schedules 갯수
    this.durationLessons = [];
    this.sessionLessons = [];

    for (let i = 0; i < student.billingPayments.length; i++) {
      if (student.billingPayments[i].durationLesson) {
        const duration = {
          id: student.billingPayments[i].durationLesson.id,
          name: student.billingPayments[i].durationLesson.name,
          paymentStatus: student.billingPayments[i].paymentStatus,
          schedules: student.billingPayments[i].durationLesson.durationSchedules.map(schedule => {
            return {
              id: schedule.id,
              startDate: schedule.startDate,
              endDate: schedule.endDate,
              startTime: schedule.startTime,
              endTime: schedule.endTime,
              repeatDate: schedule.repeatDate,
            };
          }),
        };

        this.durationLessons.push(duration);
      }

      if (student.billingPayments[i].sessionLesson) {
        const session = {
          id: student.billingPayments[i].sessionLesson.id,
          name: student.billingPayments[i].sessionLesson.name,
          totalSessions: student.billingPayments[i].sessionLesson.totalSessions,
          paymentStatus: student.billingPayments[i].paymentStatus,
          sessionCount: student.billingPayments[i].sessionLesson.sessionRegistrations[0].sessionSchedules.length,
        };
        this.sessionLessons.push(session);
      }
    }
  }
}
