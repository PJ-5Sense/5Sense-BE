import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TeacherEntity } from 'src/feature-modules/teacher/entity/teacher.entity';

export class ResponseTeacherDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  phone: string;

  constructor(teacher: TeacherEntity) {
    if (!teacher) return null;

    this.id = teacher.id;
    this.name = teacher.name;
    this.phone = teacher.phone;
  }
}
