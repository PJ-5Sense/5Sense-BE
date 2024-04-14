import { Injectable } from '@nestjs/common';
import { LessonRegistrationRepository } from './lesson-registration.repository';
import { BillingPaymentDTO } from './dto/request/billing-payment.dto';
import { PaginatedResponseBuildPaymentDTO, ResponseBuildPaymentDTO } from './dto/response/billing-payment.dto';

@Injectable()
export class LessonRegistrationService {
  constructor(private readonly lessonRegistrationRepository: LessonRegistrationRepository) {}
  async getManyBillingPayments(billingPaymentDTO: BillingPaymentDTO, centerId: number) {
    const [billingPayments, total] = await this.lessonRegistrationRepository.getManyBillingPayments(
      billingPaymentDTO,
      centerId,
    );
    return new PaginatedResponseBuildPaymentDTO(
      billingPayments.map(billingPayment => {
        return new ResponseBuildPaymentDTO(billingPayment);
      }),
      billingPaymentDTO.getPage(),
      billingPaymentDTO.getTake(),
      billingPaymentDTO.hasNextPage(total),
    );
  }
}
