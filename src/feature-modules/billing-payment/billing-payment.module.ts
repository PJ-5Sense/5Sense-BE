import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingPaymentController } from './billing-payment.controller';
import { RegistrationViewEntity } from './entity/registration-view.entity';
import { BillingPaymentService } from './billing-payment.service';
import { BillingPaymentRepository } from './billing-payment.repository';
import { SessionLessonRegistrationEntity } from '../session-lesson-registration/entity/session-registration.entity';
import { DurationLessonRegistrationEntity } from '../duration-lesson-registration/entity/duration-registration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegistrationViewEntity,
      DurationLessonRegistrationEntity,
      SessionLessonRegistrationEntity,
    ]),
  ],
  controllers: [BillingPaymentController],
  providers: [BillingPaymentService, BillingPaymentRepository],
  exports: [],
})
export class BillingPaymentModule {}
