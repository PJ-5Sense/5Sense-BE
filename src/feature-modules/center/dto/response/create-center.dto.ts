import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CenterEntity } from '../../entity/center.entity';

export class ResponseCenterDTO {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  mainPhone: string;

  @ApiProperty()
  @Expose()
  profile: string;

  @ApiProperty()
  @Expose()
  open: string;

  @ApiProperty()
  @Expose()
  close: string;

  constructor(center: CenterEntity) {
    if (!center) return null;

    this.name = center.name;
    this.address = center.address;
    this.mainPhone = center.mainPhone;
    this.profile = center.profile;
    this.open = center.open;
    this.close = center.close;
  }
}
