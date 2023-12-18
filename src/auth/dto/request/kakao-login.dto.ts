import { IsOptional, IsString } from 'class-validator';

export class socialLoginDto {
  @IsString()
  code: string;

  @IsOptional()
  state: string;
}
