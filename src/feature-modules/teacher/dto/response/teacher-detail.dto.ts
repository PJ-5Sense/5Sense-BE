import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { DurationLesson } from 'src/feature-modules/student/type/duration-lesson.type';
import { TeacherEntity } from 'src/feature-modules/teacher/entity/teacher.entity';

export class ResponseTeacherDetailDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  phone: string;

  @ApiProperty({ type: [DurationLesson] })
  @Expose()
  durationLessons: DurationLesson[];

  @ApiProperty({ example: [{ id: 0, name: 'string', totalSessions: 10, capacity: 5 }] })
  @Expose()
  sessionLessons: { id: number; name: string; totalSessions: number; capacity: number }[];

  constructor(teacher: TeacherEntity) {
    if (!teacher) return null;

    this.id = teacher.id;
    this.name = teacher.name;
    this.phone = teacher.phone;
    this.durationLessons = teacher.durationLessons.map(lesson => {
      return {
        id: lesson.id,
        name: lesson.name,
        schedules: lesson.durationSchedules.map(schedule => {
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
    this.sessionLessons = teacher.sessionLessons.map(lesson => {
      return {
        id: lesson.id,
        name: lesson.name,
        totalSessions: lesson.totalSessions,
        capacity: lesson.capacity,
      };
    });
  }
}
