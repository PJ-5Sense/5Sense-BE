import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SessionLessonEntity } from '../../session-lesson.entity';

export class ResponseFindManySessionLessonDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  lessonTime: number;

  @ApiProperty()
  @Expose()
  totalSessions: number;

  constructor(lesson: SessionLessonEntity) {
    this.id = lesson.id;
    this.name = lesson.name;
    this.lessonTime = lesson.lessonTime;
    this.totalSessions = lesson.totalSessions;
  }
}
