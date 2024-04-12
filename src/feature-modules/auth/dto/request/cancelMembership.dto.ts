import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CancelMembershipDTO {
  @ApiProperty({ description: '삭제하기 위한 인증 수단 - 이메일' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone: string;
}
