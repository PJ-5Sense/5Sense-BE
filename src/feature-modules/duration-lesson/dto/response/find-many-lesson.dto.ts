import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { DurationLessonEntity } from '../../duration-lesson.entity';

export class FindManyLessonDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  constructor(lesson: DurationLessonEntity) {
    this.id = lesson.id;
    this.name = lesson.name;
  }
}
