import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCenterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  mainPhone: string;
}
