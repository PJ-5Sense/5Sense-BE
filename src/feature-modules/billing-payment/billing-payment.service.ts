import { PaymentStatus } from 'src/feature-modules/combined-lesson/type/lesson-payment-status.type';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BillingPaymentRepository } from './billing-payment.repository';
import { BillingPaymentDTO } from './dto/request/billing-payment.dto';
import { PaginatedResponseBuildPaymentDTO, ResponseBuildPaymentDTO } from './dto/response/billing-payment.dto';
import { UpdateBuildPaymentDTO } from './dto/request/update-build-payment.dto';
import { LessonType } from '../combined-lesson/type/lesson.type';

@Injectable()
export class BillingPaymentService {
  constructor(private readonly billingPaymentRepository: BillingPaymentRepository) {}
  async getManyBillingPayments(billingPaymentDTO: BillingPaymentDTO, centerId: number) {
    const [billingPayments, total] = await this.billingPaymentRepository.getManyBillingPayments(
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
    const success = await this.billingPaymentRepository.updateBillingPayment(id, updateBuildPaymentDTO);

    if (!success) {
      // TODO: 업데이트 실패는 서버 에러가 되는것인가? 적절한 에러핸들링 고민하기
      throw new InternalServerErrorException('Failed to update the billing payment');
    }
  }

  async create(lessonId: number, studentId: number, centerId: number, paymentStatus: PaymentStatus, type: LessonType) {
    await this.billingPaymentRepository.create(lessonId, studentId, centerId, paymentStatus, type);
  }
}
