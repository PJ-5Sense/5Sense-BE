import { Injectable } from '@nestjs/common';
import { SessionLessonRegistrationRepository } from './session-registration.repository';
import { CreateSessionRegistrationDTO } from './dto/request/create-registration.dto';
import { BillingPaymentService } from '../billing-payment/billing-payment.service';
import { LessonType } from '../combined-lesson/type/lesson.type';

@Injectable()
export class SessionLessonRegistrationService {
  constructor(
    private readonly lessonRegistrationRepository: SessionLessonRegistrationRepository,
    private readonly billingPaymentService: BillingPaymentService,
  ) {}

  async create(createSessionRegistrationDTO: CreateSessionRegistrationDTO, centerId: number) {
    await this.lessonRegistrationRepository.create(createSessionRegistrationDTO);

    await this.billingPaymentService.create(
      createSessionRegistrationDTO.lessonId,
      createSessionRegistrationDTO.studentId,
      centerId,
      createSessionRegistrationDTO.paymentStatus,
      LessonType.SESSION,
    );
  }

  async findOne(lessonId: number, studentId: number) {
    return await this.lessonRegistrationRepository.findOne(lessonId, studentId);
  }
}
