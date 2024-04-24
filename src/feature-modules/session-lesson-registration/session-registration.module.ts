import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionLessonRegistrationEntity } from './entity/session-registration.entity';
import { LessonRegistrationController } from './session-registration.controller';
import { SessionLessonRegistrationService } from './session-registration.service';
import { SessionLessonRegistrationRepository } from './session-registration.repository';
import { BillingPaymentModule } from '../billing-payment/billing-payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([SessionLessonRegistrationEntity]), BillingPaymentModule],
  controllers: [LessonRegistrationController],
  providers: [SessionLessonRegistrationService, SessionLessonRegistrationRepository],
  exports: [],
})
export class SessionLessonRegistrationModule {}
