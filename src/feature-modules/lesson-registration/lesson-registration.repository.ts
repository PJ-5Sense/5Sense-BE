import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DurationLessonRegistrationEntity } from './entity/duration-registration.entity';
import { Repository } from 'typeorm';
import { SessionLessonRegistrationEntity } from './entity/session-registration.entity';
import { RegistrationViewEntity } from './entity/registration-view.entity';
import { BillingPaymentDTO, SearchPaymentStatus } from './dto/request/billing-payment.dto';

@Injectable()
export class LessonRegistrationRepository {
  constructor(
    @InjectRepository(DurationLessonRegistrationEntity)
    private readonly durationRegistrationDAO: Repository<DurationLessonRegistrationEntity>,

    @InjectRepository(SessionLessonRegistrationEntity)
    private readonly sessionRegistrationDAO: Repository<SessionLessonRegistrationEntity>,

    @InjectRepository(RegistrationViewEntity)
    private readonly registrationViewDAO: Repository<RegistrationViewEntity>,
  ) {}

  async getManyBillingPayments(billingPaymentDTO: BillingPaymentDTO, centerId: number) {
    const queryBuilder = this.registrationViewDAO
      .createQueryBuilder('registration')
      .where('registration.centerId = :centerId', { centerId });

    if (billingPaymentDTO.PaymentStatus !== SearchPaymentStatus.ALL) {
      queryBuilder.andWhere('registration.paymentStatus = :paymentStatus', {
        paymentStatus: billingPaymentDTO.PaymentStatus,
      });
    }

    if (billingPaymentDTO.searchBy === 'name') {
      queryBuilder
        .andWhere('registration.student_name LIKE :name', { name: `%${billingPaymentDTO.name}%` })
        .orderBy(`LOCATE('${billingPaymentDTO.name}', registration.student_name)`, 'ASC')
        .addOrderBy('registration.student_name', 'ASC');
    }

    if (billingPaymentDTO.searchBy === 'phone') {
      queryBuilder
        .andWhere('registration.student_phone LIKE :phone', { phone: `%${billingPaymentDTO.phone}%` })
        .orderBy(`LOCATE('${billingPaymentDTO.phone}', registration.student_phone)`, 'ASC')
        .addOrderBy('registration.student_phone', 'ASC');
    }

    if (billingPaymentDTO.searchBy === 'none') queryBuilder.orderBy('registration.createdDate', 'DESC');

    return await queryBuilder.offset(billingPaymentDTO.getSkip()).limit(billingPaymentDTO.getTake()).getManyAndCount();
  }
}
