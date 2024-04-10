import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CancelMembershipDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone: string;
}
