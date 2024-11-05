import { BillingPaymentService } from './../billing-payment/billing-payment.service';
import { Injectable } from '@nestjs/common';
import { DurationLessonRegistrationRepository } from './duration-registration.repository';
import { CreateDurationRegistrationDTO } from './dto/request/create-registration.dto';
import { LessonType } from '../combined-lesson/type/lesson.type';

@Injectable()
export class DurationLessonRegistrationService {
  constructor(
    private readonly lessonRegistrationRepository: DurationLessonRegistrationRepository,
    private readonly billingPaymentService: BillingPaymentService,
  ) {}

  async create(createDurationRegistrationDTO: CreateDurationRegistrationDTO, centerId: number) {
    await this.lessonRegistrationRepository.create(createDurationRegistrationDTO);

    await this.billingPaymentService.create(
      createDurationRegistrationDTO.lessonId,
      createDurationRegistrationDTO.studentId,
      centerId,
      createDurationRegistrationDTO.paymentStatus,
      LessonType.DURATION,
    );
  }
}
