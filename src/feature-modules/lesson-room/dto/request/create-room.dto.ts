import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Matches } from 'class-validator';

export class CreateCenterRoomDTO {
  @ApiProperty()
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,20}$`)
  name: string;

  @ApiProperty()
  @IsInt()
  capacity: number;
}
