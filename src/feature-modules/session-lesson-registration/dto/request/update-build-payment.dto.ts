import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../../../combined-lesson/type/lesson-payment-status.type';
import { LessonType } from '../../../combined-lesson/type/lesson.type';
import { IsEnum } from 'class-validator';

export class UpdateBuildPaymentDTO {
  @ApiProperty({ enum: LessonType })
  @IsEnum(LessonType)
  type: LessonType;

  @ApiProperty({ enum: PaymentStatus })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}
