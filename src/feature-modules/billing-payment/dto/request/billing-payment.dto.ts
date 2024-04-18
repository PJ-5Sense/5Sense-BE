import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { PaginationRequest } from '../../../../common/dto/request-page.dto';
import { StudentSearchType } from '../../../student/dto/request/find-students.dto';
import { ApiProperty } from '@nestjs/swagger';

export enum SearchPaymentStatus {
  UNPAID = 'Unpaid',
  PAID = 'Paid',
  ALL = 'All',
}

export class BillingPaymentDTO extends PaginationRequest {
  @ApiProperty({ enum: StudentSearchType, default: StudentSearchType.NONE })
  @IsEnum(StudentSearchType)
  searchBy: StudentSearchType;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @ValidateIf(object => object.searchBy === 'name')
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @ValidateIf(object => object.searchBy === 'phone')
  phone: string;

  @ApiProperty({ enum: SearchPaymentStatus, default: SearchPaymentStatus.ALL })
  @IsEnum(SearchPaymentStatus)
  PaymentStatus: SearchPaymentStatus;
}
