import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { BillingPaymentService } from './lesson-registration.service';
import { BillingPaymentDTO } from './dto/request/billing-payment.dto';
import { CurrentUser } from '../../common/decorator/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerBillingPayments, SwaggerUpdateBillingPayment } from 'src/swagger/lesson-registration.swagger';
import { UpdateBuildPaymentDTO } from './dto/request/update-build-payment.dto';

// TODO : 청구/납부 기록은 별도의 테이블에서 관리해야함 ( 현재 LessonRegistration 테이블을 뷰로 만들어서 사용중임 )
@ApiTags('Billing Payment - 청구/납부')
@Controller('billing-payments')
export class BillingPaymentController {
  constructor(private readonly billingPaymentService: BillingPaymentService) {}

  @SwaggerBillingPayments()
  @Get()
  async getManyBillingPayments(
    @Query() billingPaymentDTO: BillingPaymentDTO,
    @CurrentUser('centerId') centerId: number,
  ) {
    return {
      success: true,
      message: 'Successfully retrieved the billing payment list',
      data: await this.billingPaymentService.getManyBillingPayments(billingPaymentDTO, centerId),
    };
  }

  @SwaggerUpdateBillingPayment()
  @Patch(':registrationId')
  async updateBillingPayment(
    @Param('registrationId') id: number,
    @Body() updateBuildPaymentDTO: UpdateBuildPaymentDTO,
  ) {
    await this.billingPaymentService.updateBillingPayment(id, updateBuildPaymentDTO);

    return {
      success: true,
      message: 'Successfully updated the billing payment',
    };
  }
}
