import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { DurationScheduleType } from 'src/feature-modules/combined-lesson/type/lesson-schedule.type';
import { RegisteredStudentType } from 'src/feature-modules/combined-lesson/type/lesson-student.type';
import { LessonType } from 'src/feature-modules/combined-lesson/type/lesson.type';
import { DurationLessonEntity } from 'src/feature-modules/duration-lesson/duration-lesson.entity';

export class ResponseGetDetailDurationLessonDTO {
  @ApiProperty()
  @Expose()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  memo: string;

  @ApiProperty()
  @Expose()
  tuitionFee: number;

  @ApiProperty()
  @Expose()
  type: LessonType;

  @ApiProperty()
  @Expose()
  numberOfStudents: number;

  @ApiProperty({ example: { id: 1, name: '오센스' } })
  @Expose()
  teacher: { id: number; name: string };

  @ApiProperty({ example: { id: 1, name: '댄스', subId: 12, subName: '방송 댄스' } })
  @Expose()
  category: { id: number; name: string; subId: number; subName: string };

  @ApiProperty({ type: DurationScheduleType, isArray: true })
  @Expose()
  schedules: DurationScheduleType[];

  @ApiProperty({ type: RegisteredStudentType, isArray: true })
  @Expose()
  registeredStudents: RegisteredStudentType[];

  constructor(lesson: DurationLessonEntity) {
    this.id = lesson.id;
    this.name = lesson.name;
    this.memo = lesson.memo;
    this.tuitionFee = lesson.tuitionFee;
    this.type = LessonType.DURATION;
    this.numberOfStudents = lesson.durationRegistrations.length;
    this.teacher = { id: lesson.teacher.id, name: lesson.teacher.name };
    this.category = {
      id: lesson.category.parentId ?? lesson.category.id,
      name: lesson.category.parentName ?? lesson.category.name,
      subId: lesson.category.parentId ? lesson.category.id : null,
      subName: lesson.category.parentId ? lesson.category.name : null,
    };
    this.schedules = lesson.durationSchedules.map(schedule => {
      return {
        id: schedule.id,
        startDate: lesson.durationSchedules[0].startDate,
        endDate: lesson.durationSchedules[0].endDate,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        repeatDate: schedule.repeatDate,
        room: {
          id: schedule.lessonRoom.id,
          name: schedule.lessonRoom.name,
        },
      };
    });
    this.registeredStudents = lesson.durationRegistrations.map(registration => {
      return {
        name: registration.student.name,
        phone: registration.student.phone,
      };
    });
  }
}
