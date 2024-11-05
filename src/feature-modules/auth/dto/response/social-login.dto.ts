import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SocialType } from '../../type/social.type';

export class ResponseSocialLoginDTO {
  @ApiProperty({ description: '유효시간  6시간' })
  @Expose()
  accessToken: string;

  @ApiProperty({ description: '유효시간  2주' })
  @Expose()
  refreshToken: string;

  @ApiProperty({ description: '프론트가 사용하기 위한 유효시간 정보' })
  @Expose()
  accessTokenExp: Date;

  @ApiProperty({ description: '센터 존재 여부' })
  @Expose()
  hasCenter: boolean;

  @ApiProperty({ description: '센터 등록하기 위한 첫 접속에 관한 여부' })
  @Expose()
  isNew: boolean;

  @ApiProperty({ description: '소셜로그인 타입', enum: SocialType })
  @Expose()
  type: SocialType;

  constructor(authResponse: {
    accessToken: string;
    refreshToken: string;
    accessTokenExp: Date;
    hasCenter: boolean;
    isNew: boolean;
    type: SocialType;
  }) {
    Object.assign(this, authResponse);
  }
}
