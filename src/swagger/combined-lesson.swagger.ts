import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PaginatedResponseFilteredLessonDTO } from 'src/feature-modules/combined-lesson/dto/response/pagenation-response.dto';
import { ResponseCalendarLessonDTO } from '../feature-modules/combined-lesson/dto/response/calendar-lesson.dto';

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

export function SwaggerFindByDateLesson() {
  return applyDecorators(
    ApiOperation({
      summary: '클래스 목록 가져오기 (메인 페이지)',
      description: `<h2>메인 페이지에서 클래스 목록 가져오기</h2>`,
    }),
    ApiBearerAuth('AccessToken'),
    ApiOkResponse({
      status: 200,
      type: ResponseCalendarLessonDTO,
      description: `ResponseCalendarLessonDTO[][]
      <br> 해당 월에 요일 개수만큼 배열 개수가 있으며 각 요일에 클래스가 담김`,
    }),
  );
}
