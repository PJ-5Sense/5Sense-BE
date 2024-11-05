import { Expose } from 'class-transformer';
import { StudentEntity } from 'src/feature-modules/student/entity/student.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseFindManyForStudentDTO {
  @ApiProperty()
  @Expose()
  readonly id: number;

  @ApiProperty()
  @Expose()
  readonly name: string;

  @ApiProperty()
  @Expose()
  readonly phone: string;

  constructor(student: StudentEntity) {
    if (!student) return null;

    this.id = student.id;
    this.name = student.name;
    this.phone = student.phone;
  }
}
