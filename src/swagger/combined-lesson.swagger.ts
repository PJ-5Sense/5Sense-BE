import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PaginatedResponseFilteredLessonDTO } from 'src/feature-modules/combined-lesson/dto/response/pagenation-response.dto';

export function SwaggerFindByFilterLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 목록 가져오기 (클래스 관리 페이지)',
      description: `<h2>클래스 관리 페이지에서 클래스 목록 가져오기</h2>
        <br>**type이 duration인 경우 durationLesson이 필수**
        <br>**type이 session인 경우 sessionLesson이 필수**`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({ status: 200, type: PaginatedResponseFilteredLessonDTO }),
  );
}
