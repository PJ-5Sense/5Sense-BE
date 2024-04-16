import { RegistrationViewEntity } from '../../entity/registration-view.entity';
import { PaymentStatus } from '../../../combined-lesson/type/lesson-payment-status.type';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PageMeta } from 'src/common/dto/response-page.dto';

export class ResponseBuildPaymentDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  type: string;

  @ApiProperty()
  @Expose()
  paymentStatus: PaymentStatus;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  tuitionFee: number;

  @ApiProperty()
  @Expose()
  studentName: string;

  @ApiProperty()
  @Expose()
  studentPhone: string;

  @ApiProperty()
  @Expose()
  centerId: number;

  constructor(billingPayment: RegistrationViewEntity) {
    this.id = billingPayment.id;
    this.type = billingPayment.type;
    this.paymentStatus = billingPayment.paymentStatus;
    this.name = billingPayment.name;
    this.tuitionFee = billingPayment.tuitionFee;
    this.studentName = billingPayment.studentName;
    this.studentPhone = billingPayment.studentPhone;
    this.centerId = billingPayment.centerId;
  }
}

// TODO : generic하게 타입을 받아서 사용하도록 변경해야함
export class PaginatedResponseBuildPaymentDTO {
  @ApiProperty({
    type: [ResponseBuildPaymentDTO],
  })
  students: ResponseBuildPaymentDTO[];

  @ApiProperty({ type: PageMeta })
  meta: PageMeta;

  constructor(students: ResponseBuildPaymentDTO[], page: number, take: number, hasNextPage: boolean) {
    this.students = students;
    this.meta = new PageMeta({ page, take, hasNextPage });
  }
}
