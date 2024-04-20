import { Exclude, Expose } from 'class-transformer';
import { StudentEntity } from 'src/feature-modules/student/entity/student.entity';
import { DurationLessonEntity } from '../../../duration-lesson/duration-lesson.entity';
import { DurationLesson } from '../../type/duration-lesson.type';
import { ApiProperty } from '@nestjs/swagger';
import { SessionLesson } from '../../type/session-lesson.type';
import { SessionLessonRegistrationEntity } from '../../../session-lesson-registration/entity/session-registration.entity';

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
    this.durationLessons = student.durationRegistrations.map(registration => {
      return {
        id: registration.durationLesson.id,
        name: registration.durationLesson.name,
        schedules: registration.durationLesson.durationSchedules.map(schedule => {
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
    });
    this.sessionLessons = student.sessionRegistrations.map(registration => {
      return {
        id: registration.sessionLesson.id,
        name: registration.sessionLesson.name,
        totalSessions: registration.sessionLesson.totalSessions,
        sessionCount: registration.sessionSchedules.length,
      };
    });
  }
}
