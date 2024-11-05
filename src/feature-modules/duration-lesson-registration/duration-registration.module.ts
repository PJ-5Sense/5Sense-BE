import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonRegistrationEntity } from './entity/duration-registration.entity';
import { LessonRegistrationController } from './duration-registration.controller';
import { DurationLessonRegistrationService } from './duration-registration.service';
import { DurationLessonRegistrationRepository } from './duration-registration.repository';
import { BillingPaymentModule } from '../billing-payment/billing-payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([DurationLessonRegistrationEntity]), BillingPaymentModule],
  controllers: [LessonRegistrationController],
  providers: [DurationLessonRegistrationService, DurationLessonRegistrationRepository],
  exports: [],
})
export class DurationLessonRegistrationModule {}
