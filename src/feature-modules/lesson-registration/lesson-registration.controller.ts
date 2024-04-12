import { Controller, Get, Query } from '@nestjs/common';
import { LessonRegistrationService } from './lesson-registration.service';
import { BillingPaymentDTO } from './dto/request/billing-payment.dto';
import { CurrentUser } from '../../common/decorator/user.decorator';

@Controller('lesson-registrations')
export class LessonRegistrationController {
  constructor(private readonly lessonRegistrationService: LessonRegistrationService) {}

  @Get('billing-payments')
  async getManyBillingPayments(
    @Query() billingPaymentDTO: BillingPaymentDTO,
    @CurrentUser('centerId') centerId: number,
  ) {
    return {
      success: true,
      message: 'Successfully retrieved the billing payment list',
      data: await this.lessonRegistrationService.getManyBillingPayments(billingPaymentDTO, centerId),
    };
  }
}
