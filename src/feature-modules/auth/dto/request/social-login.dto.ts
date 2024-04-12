import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SocialType } from '../../type/social.type';
import { ApiProperty } from '@nestjs/swagger';

export class socialLoginDTO {
  @ApiProperty({ description: '소셜 로그인 인가 코드' })
  @IsString()
  code: string;

  @ApiProperty({ description: '소셜 로그인 state' })
  @IsOptional()
  state: string;
}

export class SocialTypeDTO {
  @ApiProperty({
    description: '소셜 로그인 타입',
    enum: SocialType,
  })
  @IsEnum(SocialType)
  socialType: SocialType;
}
