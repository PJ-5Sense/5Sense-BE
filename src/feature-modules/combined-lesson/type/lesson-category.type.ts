import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Matches } from 'class-validator';

export class LessonCategory {
  // 기타 소분류 추가 시, 프론트 측에서 id는 0번을 사용
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,50}$`)
  name: string;
}
