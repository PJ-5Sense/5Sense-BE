import { Controller } from '@nestjs/common';
import { LessonRegistrationService } from './session-registration.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lesson Registration - 클래스 등록(청구 납부 관련 포함)')
@Controller('lesson-registrations')
export class LessonRegistrationController {
  constructor(private readonly lessonRegistrationService: LessonRegistrationService) {}
}
