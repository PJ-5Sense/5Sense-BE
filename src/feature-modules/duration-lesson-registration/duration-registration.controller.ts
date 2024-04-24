import { Body, Controller, Post } from '@nestjs/common';
import { DurationLessonRegistrationService } from './duration-registration.service';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { CreateDurationRegistrationDTO } from './dto/request/create-registration.dto';
import { SwaggerCreateDurationLessonRegistration } from 'src/swagger/duration-lesson.swagger';

@ApiTags('Duration Lesson Registration - 기간반 클래스 등록')
@Controller('duration-lesson-registrations')
export class LessonRegistrationController {
  constructor(private readonly lessonRegistrationService: DurationLessonRegistrationService) {}

  @SwaggerCreateDurationLessonRegistration()
  @Post('')
  async create(
    @Body() createDurationRegistrationDTO: CreateDurationRegistrationDTO,
    @CurrentUser('centerId') centerId: number,
  ) {
    await this.lessonRegistrationService.create(createDurationRegistrationDTO, centerId);

    return {
      success: true,
      message: 'Duration lesson registration success',
    };
  }
}
