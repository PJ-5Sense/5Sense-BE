import { IsString } from 'class-validator';

export class CreateCenterDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  mainPhone: string;
}
