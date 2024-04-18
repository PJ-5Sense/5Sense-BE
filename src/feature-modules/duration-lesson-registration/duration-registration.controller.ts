import { Controller } from '@nestjs/common';
import { DurationLessonRegistrationService } from './duration-registration.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Duration Lesson Registration - 기간반 클래스 등록')
@Controller('duration-lesson-registrations')
export class LessonRegistrationController {
  constructor(private readonly lessonRegistrationService: DurationLessonRegistrationService) {}
}
