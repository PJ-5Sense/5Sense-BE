import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { PaginationRequest } from '../../../../common/dto/request-page.dto';
import { StudentSearchType } from '../../../student/dto/request/find-students.dto';

export enum SearchPaymentStatus {
  UNPAID = 'Unpaid',
  PAID = 'Paid',
  ALL = 'All',
}

export class BillingPaymentDTO extends PaginationRequest {
  @IsEnum(StudentSearchType)
  searchBy: StudentSearchType;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(object => object.searchBy === 'name')
  name: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(object => object.searchBy === 'phone')
  phone: string;

  @IsEnum(SearchPaymentStatus)
  PaymentStatus: SearchPaymentStatus;
}
