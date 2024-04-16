import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { LessonRegistrationService } from './lesson-registration.service';
import { BillingPaymentDTO } from './dto/request/billing-payment.dto';
import { CurrentUser } from '../../common/decorator/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerBillingPayments, SwaggerUpdateBillingPayment } from 'src/swagger/lesson-registration.swagger';
import { UpdateBuildPaymentDTO } from './dto/request/update-build-payment.dto';

@ApiTags('Lesson Registration - 클래스 등록(청구 납부 관련 포함)')
@Controller('lesson-registrations')
export class LessonRegistrationController {
  constructor(private readonly lessonRegistrationService: LessonRegistrationService) {}

  @SwaggerBillingPayments()
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

  @SwaggerUpdateBillingPayment()
  @Patch(':registrationId')
  async updateBillingPayment(
    @Param('registrationId') id: number,
    @Body() updateBuildPaymentDTO: UpdateBuildPaymentDTO,
  ) {
    await this.lessonRegistrationService.updateBillingPayment(id, updateBuildPaymentDTO);

    return {
      success: true,
      message: 'Successfully updated the billing payment',
    };
  }
}
