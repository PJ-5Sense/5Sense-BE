import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingPaymentController } from './billing-payment.controller';
import { BillingPaymentService } from './billing-payment.service';
import { BillingPaymentRepository } from './billing-payment.repository';
import { BillingPaymentEntity } from './entity/billing-payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillingPaymentEntity])],
  controllers: [BillingPaymentController],
  providers: [BillingPaymentService, BillingPaymentRepository],
  exports: [BillingPaymentService],
})
export class BillingPaymentModule {}
