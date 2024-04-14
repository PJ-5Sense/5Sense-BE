import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { LessonViewEntity } from '../../entity/lesson-view.entity';
import { PaginatedResponseFilteredLessonDTO } from 'src/feature-modules/lesson/dto/response/pagenation-response.dto';

export class ResponseFilteredLessonDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  type: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  teacher: string;

  @ApiProperty()
  @Expose()
  category: string;

  @ApiProperty()
  @Expose()
  numberOfStudents: number;

  constructor(lesson: LessonViewEntity) {
    this.id = lesson.id;
    this.type = lesson.type;
    this.name = lesson.name;
    this.teacher = lesson.teacher;
    this.category = lesson.category;
    this.numberOfStudents = lesson.numberOfStudents;
  }
}
