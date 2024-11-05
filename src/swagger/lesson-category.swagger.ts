import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseGetCategoryDTO } from 'src/feature-modules/lesson-category/dto/response/category.dto';

export function SwaggerLessonCategory() {
  return applyDecorators(
    ApiOperation({
      summary: '카테고리 목록 가져오기',
      description: `<h2>카테고리 목록 가져오기</h2>
          <br>**type이 duration인 경우 durationLesson이 필수**
          <br>**type이 session인 경우 sessionLesson이 필수**`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: ResponseGetCategoryDTO }),
  );
}
