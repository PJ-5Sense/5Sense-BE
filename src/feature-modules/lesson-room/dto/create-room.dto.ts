import { IsInt, Matches } from 'class-validator';

export class CreateCenterRoomDTO {
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,20}$`)
  name: string;

  @IsInt()
  capacity: number;
}
