import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LessonRegistrationRepository } from './lesson-registration.repository';
import { BillingPaymentDTO } from './dto/request/billing-payment.dto';
import { PaginatedResponseBuildPaymentDTO, ResponseBuildPaymentDTO } from './dto/response/billing-payment.dto';
import { UpdateBuildPaymentDTO } from './dto/request/update-build-payment.dto';

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

  async updateBillingPayment(id: number, updateBuildPaymentDTO: UpdateBuildPaymentDTO) {
    const success = await this.lessonRegistrationRepository.updateBillingPayment(id, updateBuildPaymentDTO);

    if (!success) {
      // TODO: 업데이트 실패는 서버 에러가 되는것인가? 적절한 에러핸들링 고민하기
      throw new InternalServerErrorException('Failed to update the billing payment');
    }
  }
}
