import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseReissueDTO {
  @Expose()
  @ApiProperty({ description: 'Access Token' })
  accessToken: string;

  @Expose()
  @ApiProperty({ description: 'Access Token Expires At' })
  accessTokenExp: Date;

  constructor({ accessToken, accessTokenExp }: { accessToken: string; accessTokenExp: Date }) {
    Object.assign(this, { accessToken, accessTokenExp });
  }
}
