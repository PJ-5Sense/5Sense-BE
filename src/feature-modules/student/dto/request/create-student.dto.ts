import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class CreateStudentDTO {
  @ApiProperty({ description: '학생 이름' })
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,20}$`)
  name: string;

  @ApiProperty({ description: '학생 번호' })
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{1,12}$`)
  phone: string;

  @ApiProperty({ type: 'string', description: '학생 세부사항/메모' })
  @Matches(`^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s.,!?-]{0,300}$`)
  particulars = '';
}
