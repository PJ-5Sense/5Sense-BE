import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCenterDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  mainPhone?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  open?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  close?: string;
}
