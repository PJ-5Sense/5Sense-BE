import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PaginatedResponseBuildPaymentDTO } from 'src/feature-modules/lesson-registration/dto/response/billing-payment.dto';

export function SwaggerBillingPayments() {
  return applyDecorators(
    ApiOperation({
      summary: '청구/납부 목록',
      description: `<h2>청구/납부 목록 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: PaginatedResponseBuildPaymentDTO }),
  );
}
