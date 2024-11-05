import { ApiProperty } from '@nestjs/swagger';

export class StudentType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
