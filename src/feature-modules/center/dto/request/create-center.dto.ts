import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCenterDto {
  @ApiProperty({ description: '센터 이름', example: '장 활동이 활발해지는 요가센터' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '센터 주소', example: '경기도 안산시 상록구 ...' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: '센터 메인 전화번호', example: '0298751111' })
  @IsString()
  @IsNotEmpty()
  mainPhone: string;

  @ApiProperty({ description: '센터 오픈 시간', example: '09:00' })
  @IsString()
  @IsNotEmpty()
  open: string;

  @ApiProperty({ description: '센터 마감 시간', example: '18:00' })
  @IsString()
  @IsNotEmpty()
  close: string;
}
