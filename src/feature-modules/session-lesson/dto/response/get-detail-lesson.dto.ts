import { LessonType } from 'src/feature-modules/combined-lesson/type/lesson.type';
import { SessionLessonEntity } from '../../session-lesson.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseGetDetailSessionLessonDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  memo: string;

  @Expose()
  @ApiProperty()
  type: LessonType;

  @Expose()
  @ApiProperty()
  lessonTime: number;

  @Expose()
  @ApiProperty()
  tuitionFee: number;

  @Expose()
  @ApiProperty()
  totalSessions: number;

  @Expose()
  @ApiProperty()
  capacity: number;

  @Expose()
  @ApiProperty()
  numberOfStudents: number;

  @Expose()
  @ApiProperty({
    example: { id: 1, name: '오센스' },
  })
  teacher: { id: number; name: string };

  @Expose()
  @ApiProperty({
    example: { id: 1, name: '댄스', subId: 12, subName: '방송 댄스' },
  })
  category: { id: number; name: string; subId: number; subName: string };

  @Expose()
  @ApiProperty({ example: [{ name: '오센스', phone: '010-1234-5678', sessionCount: '2' }] })
  registeredStudents: {
    name: string;
    phone: string;
    sessionCount: string;
  }[];

  constructor(lesson: SessionLessonEntity) {
    this.id = lesson.id;
    this.name = lesson.name;
    this.memo = lesson.memo;
    this.type = LessonType.SESSION;
    this.tuitionFee = lesson.tuitionFee;
    this.lessonTime = lesson.lessonTime;
    this.totalSessions = lesson.totalSessions;
    this.capacity = lesson.capacity;
    this.numberOfStudents = lesson.sessionRegistrations.length;
    this.teacher = { id: lesson.teacher.id, name: lesson.teacher.name };
    this.category = {
      id: lesson.category.parentId ?? lesson.category.id,
      name: lesson.category.parentName ?? lesson.category.name,
      subId: lesson.category.parentId ? lesson.category.id : null,
      subName: lesson.category.parentId ? lesson.category.name : null,
    };
    this.registeredStudents = lesson.sessionRegistrations.map(registration => {
      return {
        name: registration.student.name,
        phone: registration.student.phone,
        sessionCount: `${registration.sessionSchedules.length}/${lesson.totalSessions}`,
      };
    });
  }
}
