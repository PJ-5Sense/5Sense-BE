import { Exclude, Expose } from 'class-transformer';
import { StudentEntity } from 'src/feature-modules/student/entity/student.entity';
import { DurationLessonEntity } from '../../../lesson/entity/duration-lesson.entity';
import { DurationLesson } from '../../type/duration-lesson.type';
import { ApiProperty } from '@nestjs/swagger';
import { SessionLessonRegistrationEntity } from '../../../lesson-registration/entity/session-registration.entity';
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

  // Exclude
  @Exclude()
  readonly durationLessonList: DurationLessonEntity[];

  @Exclude()
  readonly sessionLessonList: SessionLessonRegistrationEntity[];

  // Getters
  @ApiProperty({ type: [DurationLesson] })
  @Expose()
  private durationLessons(): DurationLesson[] {
    return this.durationLessonList.map(lesson => {
      return {
        id: lesson.id,
        name: lesson.name,
        schedules: lesson.durationSchedules.map(schedule => {
          const startDate =
            `${schedule.startDate.getFullYear()}.` +
            `${schedule.startDate.getMonth() + 1}.` +
            `${schedule.startDate.getDate()}`;
          const endDate =
            `${schedule.endDate.getFullYear()}.` +
            `${schedule.endDate.getMonth() + 1}.` +
            `${schedule.endDate.getDate()}`;

          const startTime = schedule.startTime.slice(0, 5);
          const endTime = schedule.endTime.slice(0, 5);
          return {
            id: schedule.id,
            scheduleDuration: startDate + ' ~ ' + endDate,
            scheduleTime: startTime + ' - ' + endTime,
            repeatDate: schedule.repeatDate,
          };
        }),
      };
    });
  }

  @ApiProperty({ type: [SessionLesson] })
  @Expose()
  private sessionLessons(): SessionLesson[] {
    return this.sessionLessonList.map(lesson => {
      return {
        id: lesson.sessionLesson.id,
        name: lesson.sessionLesson.name,
        sessionCount: lesson.sessionSchedules.length,
        totalSessions: lesson.sessionLesson.totalSessions,
      };
    });
  }

  constructor(student: StudentEntity) {
    if (!student) return null;

    this.id = student.id;
    this.name = student.name;
    this.phone = student.phone;
    this.particulars = student.particulars;
    this.durationLessonList = student.durationRegistrations.map(lesson => lesson.durationLesson);
    this.sessionLessonList = student.sessionRegistrations;
  }
}
