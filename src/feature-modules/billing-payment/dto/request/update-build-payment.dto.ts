import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../../../combined-lesson/type/lesson-payment-status.type';
import { IsEnum } from 'class-validator';

export class UpdateBuildPaymentDTO {
  @ApiProperty({ enum: PaymentStatus })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}
