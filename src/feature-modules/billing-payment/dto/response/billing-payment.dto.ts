import { PaymentStatus } from '../../../combined-lesson/type/lesson-payment-status.type';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PageMeta } from 'src/common/dto/response-page.dto';
import { BillingPaymentEntity } from '../../entity/billing-payment.entity';
import { LessonType } from 'src/feature-modules/combined-lesson/type/lesson.type';

class Student {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;
}

class Lesson {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  tuitionFee: number;
}

export class ResponseBuildPaymentDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  paymentStatus: PaymentStatus;

  @ApiProperty({ type: Lesson })
  @Expose()
  lesson: Lesson;

  @ApiProperty({ type: Student })
  @Expose()
  student: Student;

  constructor(billingPayment: BillingPaymentEntity) {
    this.id = billingPayment.id;
    this.paymentStatus = billingPayment.paymentStatus;
    this.student = { name: billingPayment.student.name, phone: billingPayment.student.phone };

    if (billingPayment.durationLesson?.name) {
      this.lesson = {
        name: billingPayment.durationLesson.name,
        type: LessonType.DURATION,
        tuitionFee: billingPayment.durationLesson.tuitionFee,
      };
    } else {
      this.lesson = {
        name: billingPayment.sessionLesson.name,
        type: LessonType.SESSION,
        tuitionFee: billingPayment.sessionLesson.tuitionFee,
      };
    }
  }
}

// TODO : generic하게 타입을 받아서 사용하도록 변경해야함
export class PaginatedResponseBuildPaymentDTO {
  @ApiProperty({
    type: [ResponseBuildPaymentDTO],
  })
  billingPayments: ResponseBuildPaymentDTO[];

  @ApiProperty({ type: PageMeta })
  meta: PageMeta;

  constructor(billingPayments: ResponseBuildPaymentDTO[], page: number, take: number, hasNextPage: boolean) {
    this.billingPayments = billingPayments;
    this.meta = new PageMeta({ page, take, hasNextPage });
  }
}
