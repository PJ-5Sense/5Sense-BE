import { Body, Controller, Post } from '@nestjs/common';
import { SessionLessonService } from './session.lesson.service';
import { SwaggerCreateSessionLesson } from '../../swagger/lesson.swagger';
import { SessionLessonDTO } from '../combined-lesson/dto/request/create-session-lesson.dto';
import { CurrentUser } from '../../common/decorator/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Session Lesson - 회차반')
@Controller('session-lessons')
export class SessionLessonController {
  constructor(private readonly sessionLessonService: SessionLessonService) {}

  @SwaggerCreateSessionLesson()
  @Post('')
  async createSessionLesson(@Body() sessionLessonDTO: SessionLessonDTO, @CurrentUser('centerId') centerId: number) {
    await this.sessionLessonService.createSessionLesson(sessionLessonDTO, centerId);

    return {
      success: true,
      message: `The Lesson has been successfully registered`,
    };
  }
}
