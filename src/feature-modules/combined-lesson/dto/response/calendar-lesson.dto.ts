import { ApiProperty } from '@nestjs/swagger';
import { LessonType } from '../../type/lesson.type';
import { Expose } from 'class-transformer';

export class ResponseCalendarLessonDTO {
  @Expose()
  @ApiProperty({ type: Number })
  id: number;

  @Expose()
  @ApiProperty()
  type: LessonType;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  lessonTime: number;

  @Expose()
  @ApiProperty()
  memo: string;

  @Expose()
  @ApiProperty()
  startTime: string;

  @Expose()
  @ApiProperty()
  teacher: string;

  @Expose()
  @ApiProperty()
  numberOfStudents: number;

  @Expose()
  @ApiProperty()
  room: string;

  constructor(lesson: {
    id: number;
    type: LessonType;
    name: string;
    lessonTime: number;
    memo: string;
    startTime: string;
    teacher: string;
    numberOfStudents: number;
    room: string;
  }) {
    this.id = lesson.id;
    this.type = lesson.type;
    this.name = lesson.name;
    this.lessonTime = lesson.lessonTime;
    this.memo = lesson.memo;
    this.startTime = lesson.startTime;
    this.teacher = lesson.teacher;
    this.numberOfStudents = lesson.numberOfStudents;
    this.room = lesson.room;
  }
}
