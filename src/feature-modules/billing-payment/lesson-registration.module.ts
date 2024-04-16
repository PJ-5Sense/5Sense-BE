import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonRegistrationEntity } from './entity/duration-registration.entity';
import { SessionLessonRegistrationEntity } from './entity/session-registration.entity';
import { BillingPaymentController } from './lesson-registration.controller';
import { RegistrationViewEntity } from './entity/registration-view.entity';
import { BillingPaymentService } from './lesson-registration.service';
import { BillingPaymentRepository } from './lesson-registration.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DurationLessonRegistrationEntity,
      SessionLessonRegistrationEntity,
      RegistrationViewEntity,
    ]),
  ],
  controllers: [BillingPaymentController],
  providers: [BillingPaymentService, BillingPaymentRepository],
  exports: [],
})
export class BillingPaymentModule {}
