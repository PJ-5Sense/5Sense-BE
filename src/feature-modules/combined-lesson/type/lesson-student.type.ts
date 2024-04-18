import { ApiProperty } from '@nestjs/swagger';

export class RegisteredStudentType {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;
}
