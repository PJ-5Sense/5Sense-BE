import { Expose } from 'class-transformer';
import { StudentEntity } from 'src/feature-modules/student/entity/student.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PageMeta } from 'src/common/dto/response-page.dto';

// TODO : 이름 변경 필요
export class ResponseStudentWithPageMetaDTO extends PageMeta {
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

  constructor(student: StudentEntity, pageMeta: PageMeta) {
    super(pageMeta);
    if (!student) return null;

    this.id = student.id;
    this.name = student.name;
    this.phone = student.phone;
    this.particulars = student.particulars;
  }
}

export class ResponseStudentDTO {
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

  constructor(student: StudentEntity) {
    if (!student) return null;

    this.id = student.id;
    this.name = student.name;
    this.phone = student.phone;
    this.particulars = student.particulars;
  }
}
