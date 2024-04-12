import { RegistrationViewEntity } from '../../entity/registration-view.entity';
import { PaymentStatus } from './../../../lesson/types/lesson-payment-status.type';
import { Expose } from 'class-transformer';

export class ResponseBuildPaymentDTO {
  @Expose()
  id: number;

  @Expose()
  type: string;

  @Expose()
  paymentStatus: PaymentStatus;

  @Expose()
  name: string;

  @Expose()
  tuitionFee: number;

  @Expose()
  studentName: string;

  @Expose()
  studentPhone: string;

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
