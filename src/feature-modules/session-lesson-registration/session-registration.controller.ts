import { Body, Controller, Post } from '@nestjs/common';
import { SessionLessonRegistrationService } from './session-registration.service';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerCreateSessionLessonRegistration } from 'src/swagger/session-lesson.swagger';
import { CreateSessionRegistrationDTO } from './dto/request/create-registration.dto';
import { CurrentUser } from 'src/common/decorator/user.decorator';

@ApiTags('Session Lesson Registration - 회차반 클래스 등록')
@Controller('session-lesson-registrations')
export class LessonRegistrationController {
  constructor(private readonly lessonRegistrationService: SessionLessonRegistrationService) {}

  @SwaggerCreateSessionLessonRegistration()
  @Post('')
  async create(
    @Body() createSessionRegistrationDTO: CreateSessionRegistrationDTO,
    @CurrentUser('centerId') centerId: number,
  ) {
    await this.lessonRegistrationService.create(createSessionRegistrationDTO, centerId);

    return {
      success: true,
      message: 'Session lesson registration success',
    };
  }
}
