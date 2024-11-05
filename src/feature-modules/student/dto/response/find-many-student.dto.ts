import { Exclude, Expose } from 'class-transformer';
import { StudentEntity } from 'src/feature-modules/student/entity/student.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LessonType } from 'src/feature-modules/combined-lesson/type/lesson.type';

export class ResponseFindManyStudentDTO {
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

  @Exclude()
  readonly durationLessons: { id: number; name: string }[];

  @Exclude()
  readonly sessionLessons: { id: number; name: string }[];

  @ApiProperty({
    example: [
      { id: 1, name: '첫번째 기간반 클래스', type: 'duration' },
      { id: 2, name: '두번째 회차반 클래스', type: 'session' },
    ],
  })
  @Expose()
  lessons() {
    const lessons = [];
    lessons.push(...this.durationLessons);
    lessons.push(...this.sessionLessons);

    return lessons;
  }

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
        type: LessonType.DURATION,
      };
    });

    this.sessionLessons = student.sessionRegistrations.map(registration => {
      return {
        id: registration.sessionLesson.id,
        name: registration.sessionLesson.name,
        type: LessonType.SESSION,
      };
    });
  }
}
